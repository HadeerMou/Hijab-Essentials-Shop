"""
Generates the placeholder editorial imagery used across the Hijab Essentials
storefront: soft draped-fabric renders in each product colourway plus a set of
wider hero / editorial plates.

These are procedural stand-ins. Replace everything in public/products and
public/editorial with real photography before going live.

    python3 tools/generate_images.py
"""
import os
import numpy as np
from PIL import Image, ImageFilter

W, H = 1000, 1250          # product plate (4:5)
HW, HH = 2000, 1150        # editorial plate


def smooth_noise(shape, scale, rng):
    """Low-frequency value noise via upsampled random grid."""
    h, w = shape
    gh, gw = max(2, int(h / scale)), max(2, int(w / scale))
    g = rng.random((gh, gw))
    img = Image.fromarray((g * 255).astype("uint8")).resize((w, h), Image.BICUBIC)
    return np.array(img).astype(float) / 255.0


def drape(w, h, seed, folds=9, sheen=0.0, horizontal=False, softness=1.0):
    """Height/shade field that reads as folded cloth.

    Folds are warped by low-frequency noise so their width and direction vary
    across the frame the way real cloth does, then shaded asymmetrically —
    tight highlights along the ridges, broad soft shadow in the troughs.
    """
    rng = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:h, 0:w].astype(float)

    # tilt the whole fall of the cloth a few degrees off-axis
    ang = rng.uniform(-0.30, 0.30) + (np.pi / 2 if horizontal else 0.0)
    ca, sa = np.cos(ang), np.sin(ang)
    u = (xx * ca - yy * sa) / w

    # warp fold spacing: some folds pinch together, others open out
    warp = (
        2.1 * (smooth_noise((h, w), w * 0.85, rng) - 0.5)
        + 0.8 * (smooth_noise((h, w), w * 0.30, rng) - 0.5)
        + 0.3 * (smooth_noise((h, w), w * 0.11, rng) - 0.5)
    )
    phase = (u * folds + warp) * 2 * np.pi

    sh = np.sin(phase) + 0.30 * np.sin(phase * 2.17 + 1.1)
    sh = np.clip(sh / 1.30, -1, 1)
    # asymmetry: creases read deeper and wider than the lit ridges
    sh = np.where(sh < 0, -np.abs(sh) ** 0.62, np.abs(sh) ** 1.25)

    # weave grain and cloth irregularity
    sh += (smooth_noise((h, w), 40 * softness, rng) - 0.5) * 0.30
    sh += (smooth_noise((h, w), 7, rng) - 0.5) * 0.10
    shade = np.clip(sh, -1, 1)

    # macro falloff — light pooling in one part of the frame
    macro = 0.72 + 0.56 * smooth_noise((h, w), w * 1.3, rng)

    spec = np.clip(shade, 0, 1) ** 6 * sheen * macro
    return shade * macro, spec


def vignette(w, h, strength=0.30):
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    dx = (xx - w / 2) / (w / 2)
    dy = (yy - h / 2) / (h / 2)
    d = np.sqrt(dx ** 2 + dy ** 2) / 1.42
    return 1.0 - strength * np.clip(d, 0, 1) ** 1.9


def render(color, seed, w=W, h=H, folds=9, sheen=0.0, horizontal=False,
           contrast=0.40, light=0.12, grain=0.012):
    base = np.array(color, dtype=float) / 255.0
    shade, spec = drape(w, h, seed, folds=folds, sheen=sheen, horizontal=horizontal)

    # dark colours need multiplicative shading, light ones additive — blend both
    lum = base.mean()
    lift = 1.0 + shade * contrast * (0.55 + 0.9 * (1 - lum))
    img = base[None, None, :] * lift[:, :, None]

    # soft key light from upper left
    yy, xx = np.mgrid[0:h, 0:w].astype(float)
    key = 1.0 + light * (1.0 - (xx / w) * 0.75 - (yy / h) * 0.55)
    img *= key[:, :, None]

    img += spec[:, :, None] * (1.0 - base)[None, None, :] * 0.9
    img *= vignette(w, h)[:, :, None]

    rng = np.random.default_rng(seed + 991)
    img += rng.normal(0, grain, (h, w, 1))

    out = Image.fromarray((np.clip(img, 0, 1) * 255).astype("uint8"))
    return out.filter(ImageFilter.GaussianBlur(0.45))


# ---------------------------------------------------------------- colourways
COLOURS = {
    "black":      (26, 26, 27),
    "charcoal":   (58, 58, 60),
    "ash":        (146, 145, 142),
    "pearl":      (233, 230, 224),
    "ivory":      (241, 236, 227),
    "sand":       (206, 192, 174),
    "camel":      (176, 145, 112),
    "mocha":      (124, 101, 86),
    "espresso":   (74, 58, 49),
    "blush":      (214, 187, 182),
    "rosewood":   (155, 116, 115),
    "sage":       (158, 165, 148),
    "olive":      (108, 111, 88),
    "navy":       (46, 55, 76),
    "denim":      (104, 121, 140),
    "plum":       (94, 72, 84),
    "stone":      (178, 172, 162),
    "white":      (247, 245, 241),
}

# product slug -> (colour key, fabric behaviour, seed offset)
PRODUCTS = [
    # slug,                       colours,                         sheen, folds, flat
    ("signature-jersey-hijab",    ["black", "ivory", "ash", "mocha", "sage", "navy"], 0.05, 8,  False),
    ("premium-chiffon-hijab",     ["blush", "black", "pearl", "rosewood", "sand"],    0.22, 13, False),
    ("crinkle-cotton-hijab",      ["ivory", "olive", "denim", "camel"],               0.03, 17, False),
    ("silk-satin-hijab",          ["black", "pearl", "plum", "espresso"],             0.62, 7,  False),
    ("modal-everyday-hijab",      ["stone", "charcoal", "blush", "sage"],             0.08, 9,  False),
    ("georgette-hijab",           ["navy", "ivory", "rosewood"],                      0.16, 12, False),
    ("instant-slip-on-hijab",     ["black", "mocha", "ash"],                          0.07, 8,  False),
    ("sport-jersey-hijab",        ["black", "charcoal", "olive"],                     0.05, 10, False),
    ("printed-modal-hijab",       ["sand", "plum", "sage"],                           0.12, 11, False),
    ("bamboo-undercap",           ["black", "ivory", "mocha"],                        0.04, 6,  True),
    ("lace-trim-undercap",        ["black", "pearl", "blush"],                        0.06, 7,  True),
    ("no-snag-hijab-pins",        ["pearl", "black"],                                 0.30, 5,  True),
    ("magnetic-hijab-pins",       ["stone", "charcoal"],                              0.34, 5,  True),
    ("volumising-scrunchie",      ["black", "camel", "ivory"],                        0.06, 6,  True),
    ("travel-hijab-organiser",    ["espresso", "stone"],                              0.10, 4,  True),
    ("the-everyday-edit",         ["sand", "black"],                                  0.09, 6,  True),
    ("the-luxe-gift-set",         ["espresso", "pearl"],                              0.20, 5,  True),
]

EDITORIAL = [
    # name,            colour,      sheen, folds
    ("hero",           "espresso",  0.18, 6),
    ("hero-alt",       "sand",      0.10, 8),
    ("story",          "ivory",     0.08, 10),
    ("styling",        "mocha",     0.14, 7),
    ("campaign-wide",  "black",     0.28, 5),
    ("newsletter",     "stone",     0.10, 9),
    ("category-hijabs", "navy",     0.16, 9),
    ("category-essentials", "camel", 0.10, 6),
    ("category-sets",  "plum",      0.22, 7),
]


def main():
    os.makedirs("public/products", exist_ok=True)
    os.makedirs("public/editorial", exist_ok=True)

    seed = 1000
    for slug, colours, sheen, folds, flat in PRODUCTS:
        for c in colours:
            seed += 7
            for idx, variant in enumerate(("a", "b")):
                img = render(
                    COLOURS[c],
                    seed + idx * 313,
                    folds=max(3.0, folds * 0.62) + idx * 1.6,
                    sheen=sheen,
                    horizontal=flat and idx == 0,
                )
                img.save(f"public/products/{slug}-{c}-{variant}.jpg", quality=88,
                         optimize=True, progressive=True)
        print("·", slug, len(colours) * 2, "plates")

    for name, c, sheen, folds in EDITORIAL:
        seed += 11
        img = render(COLOURS[c], seed, w=HW, h=HH, folds=folds * 0.8, sheen=sheen,
                     contrast=0.30, light=0.13)
        img.save(f"public/editorial/{name}.jpg", quality=86, optimize=True,
                 progressive=True)
    print("·", len(EDITORIAL), "editorial plates")


if __name__ == "__main__":
    main()
