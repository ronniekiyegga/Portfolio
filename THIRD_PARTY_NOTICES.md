# Third-party notices

This project includes code adapted from the open-source projects below. Each
entry lists the files it covers and reproduces the licence under which that
code is used.

## React Bits

- Source: https://github.com/DavidHDev/react-bits (compared against commit
  `ca44b3f9ee18`, retrieved 2026-10-06)
- Licence: MIT + Commons Clause License Condition v1.0
- Files adapted from React Bits components:

| File in this repository | React Bits component |
|---|---|
| `app/(home)/_features/selected-design/DepthCarousel.tsx` | `Components/DepthCarousel` |
| `app/components/InfiniteSpiral.tsx` | `Components/InfiniteSpiral` |
| `app/components/SpecularButton.tsx` | `Components/SpecularButton` |
| `shared/components/effects/SplashCursor.tsx` | `Animations/SplashCursor` |
| `shared/components/effects/Lanyard.tsx` | `Components/Lanyard` |

- Assets derived from the React Bits Lanyard component: `public/lanyard/card.glb`
  (re-exported model) and `public/lanyard/lanyard.png` (resized texture). These
  are listed for attribution; whether the licence below extends to them has not
  been confirmed.

```text
MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**

## No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## WebGL Fluid Simulation

- Source: https://github.com/PavelDoGreat/WebGL-Fluid-Simulation (compared
  against commit `a2d292931f19`, retrieved 2026-10-06)
- Licence: MIT
- Files: `shared/components/effects/SplashCursor.tsx` — the fluid simulation and
  its shaders derive from this project, via the React Bits `SplashCursor`
  component.

```text
MIT License

Copyright (c) 2017 Pavel Dobryakov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
