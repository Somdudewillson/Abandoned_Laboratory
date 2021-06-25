import { ContextHash, EntityToken } from "./tokenizer";

export const BasicMarkovModel: Map<
  ContextHash,
  Array<{ token: EntityToken; weight: float }>
> = new Map([
  [
    "4 3 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5135135135135135 },
      { token: EntityToken.AIR, weight: 0.3581081081081081 },
      { token: EntityToken.PASSABLE, weight: 0.12837837837837837 },
    ],
  ],
  [
    "0 0 1 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.08771929824561403 },
      { token: EntityToken.AIR, weight: 0.8421052631578947 },
      { token: EntityToken.PASSABLE, weight: 0.07017543859649122 },
    ],
  ],
  [
    "4 4 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4368138711186445 },
      { token: EntityToken.AIR, weight: 0.5473782054787031 },
      { token: EntityToken.PASSABLE, weight: 0.015807923402652475 },
    ],
  ],
  ["0 2 0 4", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "4 3 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.08333333333333333 },
      { token: EntityToken.AIR, weight: 0.5833333333333334 },
      { token: EntityToken.PASSABLE, weight: 0.3333333333333333 },
    ],
  ],
  ["3 0 2 4", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 1 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2777777777777778 },
      { token: EntityToken.AIR, weight: 0.7222222222222222 },
    ],
  ],
  [
    "4 4 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.9081585010218218 },
      { token: EntityToken.AIR, weight: 0.08271781643946759 },
      { token: EntityToken.PASSABLE, weight: 0.009123682538710591 },
    ],
  ],
  [
    "4 0 1 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.7682291666666666 },
      { token: EntityToken.AIR, weight: 0.20833333333333334 },
      { token: EntityToken.PASSABLE, weight: 0.0234375 },
    ],
  ],
  [
    "0 4 4 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.7289719626168224 },
      { token: EntityToken.AIR, weight: 0.19626168224299065 },
      { token: EntityToken.PASSABLE, weight: 0.07476635514018691 },
    ],
  ],
  [
    "3 1 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4 },
      { token: EntityToken.PASSABLE, weight: 0.6 },
    ],
  ],
  [
    "0 1 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.18181818181818182 },
      { token: EntityToken.AIR, weight: 0.6666666666666666 },
      { token: EntityToken.PASSABLE, weight: 0.15151515151515152 },
    ],
  ],
  ["0 2 4 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 4 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.AIR, weight: 0.4166666666666667 },
      { token: EntityToken.PASSABLE, weight: 0.08333333333333333 },
    ],
  ],
  [
    "3 3 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.1326530612244898 },
      { token: EntityToken.AIR, weight: 0.7448979591836735 },
      { token: EntityToken.PASSABLE, weight: 0.12244897959183673 },
    ],
  ],
  ["4 0 0 2", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 1 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3333333333333333 },
      { token: EntityToken.PASSABLE, weight: 0.6666666666666666 },
    ],
  ],
  [
    "3 0 1 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.06779661016949153 },
      { token: EntityToken.AIR, weight: 0.8983050847457628 },
      { token: EntityToken.PASSABLE, weight: 0.03389830508474576 },
    ],
  ],
  [
    "3 3 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.375 },
      { token: EntityToken.AIR, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.125 },
    ],
  ],
  [
    "0 4 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.45461300835447604 },
      { token: EntityToken.AIR, weight: 0.5249413488179531 },
      { token: EntityToken.PASSABLE, weight: 0.02044564282757083 },
    ],
  ],
  ["2 4 0 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["1 4 4 3", [{ token: EntityToken.IMPASSABLE_GROUND, weight: 1.0 }]],
  [
    "0 0 1 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.07295690936106984 },
      { token: EntityToken.AIR, weight: 0.9099554234769688 },
      { token: EntityToken.PASSABLE, weight: 0.017087667161961365 },
    ],
  ],
  [
    "4 3 4 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.38461538461538464 },
      { token: EntityToken.AIR, weight: 0.46153846153846156 },
      { token: EntityToken.PASSABLE, weight: 0.15384615384615385 },
    ],
  ],
  [
    "3 1 3 0",
    [
      { token: EntityToken.AIR, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.5 },
    ],
  ],
  [
    "3 0 1 3",
    [
      { token: EntityToken.AIR, weight: 0.2727272727272727 },
      { token: EntityToken.PASSABLE, weight: 0.7272727272727273 },
    ],
  ],
  [
    "4 3 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.AIR, weight: 0.32142857142857145 },
      { token: EntityToken.PASSABLE, weight: 0.17857142857142858 },
    ],
  ],
  [
    "4 1 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8648648648648649 },
      { token: EntityToken.AIR, weight: 0.13513513513513514 },
    ],
  ],
  ["0 3 3 2", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 4 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.AIR, weight: 0.39285714285714285 },
      { token: EntityToken.PASSABLE, weight: 0.10714285714285714 },
    ],
  ],
  [
    "0 3 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.45 },
      { token: EntityToken.AIR, weight: 0.4125 },
      { token: EntityToken.PASSABLE, weight: 0.1375 },
    ],
  ],
  [
    "0 4 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2996575342465753 },
      { token: EntityToken.AIR, weight: 0.6857876712328768 },
      { token: EntityToken.PASSABLE, weight: 0.014554794520547944 },
    ],
  ],
  [
    "4 0 1 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.44 },
      { token: EntityToken.AIR, weight: 0.51 },
      { token: EntityToken.PASSABLE, weight: 0.05 },
    ],
  ],
  [
    "4 1 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.6 },
      { token: EntityToken.AIR, weight: 0.2 },
      { token: EntityToken.PASSABLE, weight: 0.2 },
    ],
  ],
  ["0 5 0 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "4 0 3 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.49411764705882355 },
      { token: EntityToken.AIR, weight: 0.3588235294117647 },
      { token: EntityToken.PASSABLE, weight: 0.14705882352941177 },
    ],
  ],
  [
    "1 4 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3 },
      { token: EntityToken.AIR, weight: 0.68 },
      { token: EntityToken.PASSABLE, weight: 0.02 },
    ],
  ],
  [
    "1 4 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.AIR, weight: 0.5 },
    ],
  ],
  [
    "4 3 3 3",
    [
      { token: EntityToken.AIR, weight: 0.5714285714285714 },
      { token: EntityToken.PASSABLE, weight: 0.42857142857142855 },
    ],
  ],
  [
    "0 4 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.34210526315789475 },
      { token: EntityToken.AIR, weight: 0.2631578947368421 },
      { token: EntityToken.PASSABLE, weight: 0.39473684210526316 },
    ],
  ],
  [
    "0 4 1 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.7579665859756339 },
      { token: EntityToken.AIR, weight: 0.24203341402436604 },
    ],
  ],
  [
    "1 4 1 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.AIR, weight: 0.5 },
    ],
  ],
  ["4 0 2 3", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 0 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.17243689970962697 },
      { token: EntityToken.AIR, weight: 0.8157248157248157 },
      { token: EntityToken.PASSABLE, weight: 0.011838284565557293 },
    ],
  ],
  [
    "4 4 3 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.AIR, weight: 0.4166666666666667 },
      { token: EntityToken.PASSABLE, weight: 0.08333333333333333 },
    ],
  ],
  ["4 2 0 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["3 3 1 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["4 1 0 3", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 4 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.7368421052631579 },
      { token: EntityToken.AIR, weight: 0.2 },
      { token: EntityToken.PASSABLE, weight: 0.06315789473684211 },
    ],
  ],
  ["3 3 4 1", [{ token: EntityToken.PASSABLE, weight: 1.0 }]],
  [
    "0 0 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.07077326343381389 },
      { token: EntityToken.AIR, weight: 0.8820445609436435 },
      { token: EntityToken.PASSABLE, weight: 0.047182175622542594 },
    ],
  ],
  [
    "4 4 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.9381443298969072 },
      { token: EntityToken.AIR, weight: 0.06013745704467354 },
      { token: EntityToken.PASSABLE, weight: 0.001718213058419244 },
    ],
  ],
  [
    "4 3 1 1",
    [
      { token: EntityToken.AIR, weight: 0.375 },
      { token: EntityToken.PASSABLE, weight: 0.625 },
    ],
  ],
  [
    "3 4 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4166666666666667 },
      { token: EntityToken.AIR, weight: 0.3333333333333333 },
      { token: EntityToken.PASSABLE, weight: 0.25 },
    ],
  ],
  [
    "4 0 4 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5789473684210527 },
      { token: EntityToken.AIR, weight: 0.3157894736842105 },
      { token: EntityToken.PASSABLE, weight: 0.10526315789473684 },
    ],
  ],
  ["2 0 4 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 3 0 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.10784313725490197 },
      { token: EntityToken.AIR, weight: 0.7156862745098039 },
      { token: EntityToken.PASSABLE, weight: 0.17647058823529413 },
    ],
  ],
  ["1 2 0 1", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 0 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.08695652173913043 },
      { token: EntityToken.AIR, weight: 0.5434782608695652 },
      { token: EntityToken.PASSABLE, weight: 0.3695652173913043 },
    ],
  ],
  [
    "0 4 3 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5714285714285714 },
      { token: EntityToken.AIR, weight: 0.38095238095238093 },
      { token: EntityToken.PASSABLE, weight: 0.047619047619047616 },
    ],
  ],
  [
    "0 3 3 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.125 },
      { token: EntityToken.AIR, weight: 0.875 },
    ],
  ],
  [
    "4 0 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8751229105211407 },
      { token: EntityToken.AIR, weight: 0.11258603736479843 },
      { token: EntityToken.PASSABLE, weight: 0.012291052114060964 },
    ],
  ],
  [
    "0 3 3 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.05555555555555555 },
      { token: EntityToken.AIR, weight: 0.5555555555555556 },
      { token: EntityToken.PASSABLE, weight: 0.3888888888888889 },
    ],
  ],
  [
    "0 4 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.43010752688172044 },
      { token: EntityToken.AIR, weight: 0.4731182795698925 },
      { token: EntityToken.PASSABLE, weight: 0.0967741935483871 },
    ],
  ],
  ["1 0 0 3", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 0 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.AIR, weight: 0.35714285714285715 },
      { token: EntityToken.PASSABLE, weight: 0.14285714285714285 },
    ],
  ],
  [
    "3 0 4 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2 },
      { token: EntityToken.AIR, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.3 },
    ],
  ],
  [
    "1 3 3 1",
    [
      { token: EntityToken.AIR, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.5 },
    ],
  ],
  [
    "4 4 1 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.7043478260869566 },
      { token: EntityToken.AIR, weight: 0.2956521739130435 },
    ],
  ],
  [
    "1 4 3 1",
    [
      { token: EntityToken.AIR, weight: 0.6 },
      { token: EntityToken.PASSABLE, weight: 0.4 },
    ],
  ],
  [
    "4 4 1 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.7709923664122137 },
      { token: EntityToken.AIR, weight: 0.22900763358778625 },
    ],
  ],
  [
    "4 4 1 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.9509803921568627 },
      { token: EntityToken.AIR, weight: 0.049019607843137254 },
    ],
  ],
  [
    "4 3 1 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.6666666666666666 },
      { token: EntityToken.AIR, weight: 0.13333333333333333 },
      { token: EntityToken.PASSABLE, weight: 0.2 },
    ],
  ],
  [
    "3 0 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.18072289156626506 },
      { token: EntityToken.AIR, weight: 0.6867469879518072 },
      { token: EntityToken.PASSABLE, weight: 0.13253012048192772 },
    ],
  ],
  [
    "0 4 1 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.AIR, weight: 0.5 },
    ],
  ],
  [
    "0 4 3 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.45161290322580644 },
      { token: EntityToken.AIR, weight: 0.3870967741935484 },
      { token: EntityToken.PASSABLE, weight: 0.16129032258064516 },
    ],
  ],
  [
    "3 0 0 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.10666666666666667 },
      { token: EntityToken.AIR, weight: 0.64 },
      { token: EntityToken.PASSABLE, weight: 0.25333333333333335 },
    ],
  ],
  [
    "3 4 1 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.42857142857142855 },
      { token: EntityToken.AIR, weight: 0.5714285714285714 },
    ],
  ],
  [
    "3 3 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.11764705882352941 },
      { token: EntityToken.AIR, weight: 0.6176470588235294 },
      { token: EntityToken.PASSABLE, weight: 0.2647058823529412 },
    ],
  ],
  ["0 5 1 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "4 3 3 1",
    [
      { token: EntityToken.AIR, weight: 0.2857142857142857 },
      { token: EntityToken.PASSABLE, weight: 0.7142857142857143 },
    ],
  ],
  [
    "4 3 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.058823529411764705 },
      { token: EntityToken.AIR, weight: 0.7647058823529411 },
      { token: EntityToken.PASSABLE, weight: 0.17647058823529413 },
    ],
  ],
  ["3 3 3 1", [{ token: EntityToken.PASSABLE, weight: 1.0 }]],
  [
    "4 0 0 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.18666666666666668 },
      { token: EntityToken.AIR, weight: 0.68 },
      { token: EntityToken.PASSABLE, weight: 0.13333333333333333 },
    ],
  ],
  [
    "4 0 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.38092592592592595 },
      { token: EntityToken.AIR, weight: 0.5885185185185186 },
      { token: EntityToken.PASSABLE, weight: 0.030555555555555555 },
    ],
  ],
  [
    "1 0 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4444444444444444 },
      { token: EntityToken.AIR, weight: 0.5555555555555556 },
    ],
  ],
  [
    "0 3 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.17647058823529413 },
      { token: EntityToken.AIR, weight: 0.6470588235294118 },
      { token: EntityToken.PASSABLE, weight: 0.17647058823529413 },
    ],
  ],
  ["0 0 4 2", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["5 0 0 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["0 1 5 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["2 3 3 4", [{ token: EntityToken.PASSABLE, weight: 1.0 }]],
  [
    "0 0 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.10377358490566038 },
      { token: EntityToken.AIR, weight: 0.7924528301886793 },
      { token: EntityToken.PASSABLE, weight: 0.10377358490566038 },
    ],
  ],
  [
    "0 3 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.1 },
      { token: EntityToken.AIR, weight: 0.625 },
      { token: EntityToken.PASSABLE, weight: 0.275 },
    ],
  ],
  [
    "1 4 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.6672226855713094 },
      { token: EntityToken.AIR, weight: 0.3327773144286906 },
    ],
  ],
  [
    "4 4 0 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4864864864864865 },
      { token: EntityToken.AIR, weight: 0.3783783783783784 },
      { token: EntityToken.PASSABLE, weight: 0.13513513513513514 },
    ],
  ],
  [
    "1 4 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.7894736842105263 },
      { token: EntityToken.AIR, weight: 0.21052631578947367 },
    ],
  ],
  [
    "3 3 1 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.6666666666666666 },
      { token: EntityToken.PASSABLE, weight: 0.3333333333333333 },
    ],
  ],
  [
    "3 4 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.7777777777777778 },
      { token: EntityToken.AIR, weight: 0.18518518518518517 },
      { token: EntityToken.PASSABLE, weight: 0.037037037037037035 },
    ],
  ],
  ["4 1 3 4", [{ token: EntityToken.PASSABLE, weight: 1.0 }]],
  [
    "3 0 3 1",
    [
      { token: EntityToken.AIR, weight: 0.6923076923076923 },
      { token: EntityToken.PASSABLE, weight: 0.3076923076923077 },
    ],
  ],
  [
    "3 0 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.1111111111111111 },
      { token: EntityToken.AIR, weight: 0.7171717171717171 },
      { token: EntityToken.PASSABLE, weight: 0.1717171717171717 },
    ],
  ],
  [
    "4 3 0 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.10714285714285714 },
      { token: EntityToken.AIR, weight: 0.5714285714285714 },
      { token: EntityToken.PASSABLE, weight: 0.32142857142857145 },
    ],
  ],
  [
    "3 3 0 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.08 },
      { token: EntityToken.AIR, weight: 0.58 },
      { token: EntityToken.PASSABLE, weight: 0.34 },
    ],
  ],
  [
    "0 0 3 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2972972972972973 },
      { token: EntityToken.AIR, weight: 0.5608108108108109 },
      { token: EntityToken.PASSABLE, weight: 0.14189189189189189 },
    ],
  ],
  [
    "4 0 3 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2 },
      { token: EntityToken.AIR, weight: 0.3333333333333333 },
      { token: EntityToken.PASSABLE, weight: 0.4666666666666667 },
    ],
  ],
  [
    "4 0 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3333333333333333 },
      { token: EntityToken.AIR, weight: 0.5873015873015873 },
      { token: EntityToken.PASSABLE, weight: 0.07936507936507936 },
    ],
  ],
  [
    "3 4 4 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2 },
      { token: EntityToken.AIR, weight: 0.8 },
    ],
  ],
  [
    "3 3 1 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.5 },
    ],
  ],
  [
    "4 3 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3064516129032258 },
      { token: EntityToken.AIR, weight: 0.6451612903225806 },
      { token: EntityToken.PASSABLE, weight: 0.04838709677419355 },
    ],
  ],
  [
    "4 4 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8740786240786241 },
      { token: EntityToken.AIR, weight: 0.11425061425061425 },
      { token: EntityToken.PASSABLE, weight: 0.01167076167076167 },
    ],
  ],
  [
    "4 4 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.6776315789473685 },
      { token: EntityToken.AIR, weight: 0.3059210526315789 },
      { token: EntityToken.PASSABLE, weight: 0.01644736842105263 },
    ],
  ],
  [
    "0 2 0 0",
    [
      { token: EntityToken.AIR, weight: 0.998769987699877 },
      { token: EntityToken.PASSABLE, weight: 0.0012300123001230013 },
    ],
  ],
  [
    "3 3 4 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.1111111111111111 },
      { token: EntityToken.AIR, weight: 0.3333333333333333 },
      { token: EntityToken.PASSABLE, weight: 0.5555555555555556 },
    ],
  ],
  [
    "1 0 3 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.10810810810810811 },
      { token: EntityToken.AIR, weight: 0.8108108108108109 },
      { token: EntityToken.PASSABLE, weight: 0.08108108108108109 },
    ],
  ],
  ["0 1 4 1", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 4 0 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4375 },
      { token: EntityToken.AIR, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.0625 },
    ],
  ],
  ["3 2 0 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 3 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.18421052631578946 },
      { token: EntityToken.AIR, weight: 0.5789473684210527 },
      { token: EntityToken.PASSABLE, weight: 0.23684210526315788 },
    ],
  ],
  [
    "3 3 0 1",
    [
      { token: EntityToken.AIR, weight: 0.6666666666666666 },
      { token: EntityToken.PASSABLE, weight: 0.3333333333333333 },
    ],
  ],
  [
    "3 4 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2537313432835821 },
      { token: EntityToken.AIR, weight: 0.7014925373134329 },
      { token: EntityToken.PASSABLE, weight: 0.04477611940298507 },
    ],
  ],
  ["2 4 4 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["0 0 5 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["4 0 4 2", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 0 1 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2 },
      { token: EntityToken.AIR, weight: 0.4 },
      { token: EntityToken.PASSABLE, weight: 0.4 },
    ],
  ],
  [
    "4 4 4 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8064516129032258 },
      { token: EntityToken.AIR, weight: 0.12903225806451613 },
      { token: EntityToken.PASSABLE, weight: 0.06451612903225806 },
    ],
  ],
  [
    "0 4 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.16543767840152235 },
      { token: EntityToken.AIR, weight: 0.82290675547098 },
      { token: EntityToken.PASSABLE, weight: 0.011655566127497621 },
    ],
  ],
  [
    "4 0 1 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3 },
      { token: EntityToken.AIR, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.2 },
    ],
  ],
  ["4 2 4 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 0 1 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.13443830570902393 },
      { token: EntityToken.AIR, weight: 0.8121546961325967 },
      { token: EntityToken.PASSABLE, weight: 0.053406998158379376 },
    ],
  ],
  [
    "3 0 1 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.16666666666666666 },
      { token: EntityToken.AIR, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.3333333333333333 },
    ],
  ],
  [
    "4 4 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3333333333333333 },
      { token: EntityToken.AIR, weight: 0.4444444444444444 },
      { token: EntityToken.PASSABLE, weight: 0.2222222222222222 },
    ],
  ],
  [
    "4 3 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.6 },
      { token: EntityToken.AIR, weight: 0.2 },
      { token: EntityToken.PASSABLE, weight: 0.2 },
    ],
  ],
  ["3 1 3 4", [{ token: EntityToken.IMPASSABLE_GROUND, weight: 1.0 }]],
  [
    "4 3 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.782608695652174 },
      { token: EntityToken.AIR, weight: 0.10869565217391304 },
      { token: EntityToken.PASSABLE, weight: 0.10869565217391304 },
    ],
  ],
  ["0 2 4 4", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "4 1 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8666666666666667 },
      { token: EntityToken.AIR, weight: 0.13333333333333333 },
    ],
  ],
  [
    "3 1 3 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.5 },
    ],
  ],
  [
    "0 0 1 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3121761658031088 },
      { token: EntityToken.AIR, weight: 0.6826424870466321 },
      { token: EntityToken.PASSABLE, weight: 0.0051813471502590676 },
    ],
  ],
  [
    "0 1 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8235294117647058 },
      { token: EntityToken.AIR, weight: 0.17647058823529413 },
    ],
  ],
  [
    "4 0 1 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3100558659217877 },
      { token: EntityToken.AIR, weight: 0.6871508379888268 },
      { token: EntityToken.PASSABLE, weight: 0.002793296089385475 },
    ],
  ],
  [
    "0 3 4 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5 },
      { token: EntityToken.AIR, weight: 0.14285714285714285 },
      { token: EntityToken.PASSABLE, weight: 0.35714285714285715 },
    ],
  ],
  [
    "3 4 0 3",
    [
      { token: EntityToken.AIR, weight: 0.8 },
      { token: EntityToken.PASSABLE, weight: 0.2 },
    ],
  ],
  [
    "0 1 3 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3333333333333333 },
      { token: EntityToken.AIR, weight: 0.6666666666666666 },
    ],
  ],
  [
    "3 3 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.11555555555555555 },
      { token: EntityToken.AIR, weight: 0.6266666666666667 },
      { token: EntityToken.PASSABLE, weight: 0.2577777777777778 },
    ],
  ],
  [
    "4 1 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.75 },
      { token: EntityToken.AIR, weight: 0.25 },
    ],
  ],
  ["0 4 4 2", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "1 4 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.6071428571428571 },
      { token: EntityToken.AIR, weight: 0.35714285714285715 },
      { token: EntityToken.PASSABLE, weight: 0.03571428571428571 },
    ],
  ],
  [
    "1 4 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.36666666666666664 },
      { token: EntityToken.AIR, weight: 0.6333333333333333 },
    ],
  ],
  [
    "0 0 0 2",
    [
      { token: EntityToken.AIR, weight: 0.9988839285714286 },
      { token: EntityToken.PASSABLE, weight: 0.0011160714285714285 },
    ],
  ],
  [
    "4 3 3 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2777777777777778 },
      { token: EntityToken.AIR, weight: 0.4722222222222222 },
      { token: EntityToken.PASSABLE, weight: 0.25 },
    ],
  ],
  [
    "4 0 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.225 },
      { token: EntityToken.AIR, weight: 0.6 },
      { token: EntityToken.PASSABLE, weight: 0.175 },
    ],
  ],
  [
    "4 4 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.46875 },
      { token: EntityToken.AIR, weight: 0.34375 },
      { token: EntityToken.PASSABLE, weight: 0.1875 },
    ],
  ],
  [
    "0 0 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3075601374570447 },
      { token: EntityToken.AIR, weight: 0.6726804123711341 },
      { token: EntityToken.PASSABLE, weight: 0.019759450171821305 },
    ],
  ],
  [
    "3 0 3 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.125 },
      { token: EntityToken.AIR, weight: 0.5833333333333334 },
      { token: EntityToken.PASSABLE, weight: 0.2916666666666667 },
    ],
  ],
  ["0 0 0 5", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 3 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2857142857142857 },
      { token: EntityToken.AIR, weight: 0.5714285714285714 },
      { token: EntityToken.PASSABLE, weight: 0.14285714285714285 },
    ],
  ],
  [
    "3 4 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.9230769230769231 },
      { token: EntityToken.AIR, weight: 0.07692307692307693 },
    ],
  ],
  [
    "3 3 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4090909090909091 },
      { token: EntityToken.AIR, weight: 0.18181818181818182 },
      { token: EntityToken.PASSABLE, weight: 0.4090909090909091 },
    ],
  ],
  [
    "3 3 1 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.1111111111111111 },
      { token: EntityToken.AIR, weight: 0.5555555555555556 },
      { token: EntityToken.PASSABLE, weight: 0.3333333333333333 },
    ],
  ],
  ["4 0 2 4", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 1 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.06407322654462243 },
      { token: EntityToken.AIR, weight: 0.9107551487414187 },
      { token: EntityToken.PASSABLE, weight: 0.02517162471395881 },
    ],
  ],
  [
    "0 0 2 0",
    [
      { token: EntityToken.AIR, weight: 0.9987531172069826 },
      { token: EntityToken.PASSABLE, weight: 0.0012468827930174563 },
    ],
  ],
  [
    "0 4 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.9101032047800108 },
      { token: EntityToken.AIR, weight: 0.08500814774579032 },
      { token: EntityToken.PASSABLE, weight: 0.004888647474198805 },
    ],
  ],
  [
    "4 3 1 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8571428571428571 },
      { token: EntityToken.AIR, weight: 0.14285714285714285 },
    ],
  ],
  [
    "0 0 3 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.03260869565217391 },
      { token: EntityToken.AIR, weight: 0.8586956521739131 },
      { token: EntityToken.PASSABLE, weight: 0.10869565217391304 },
    ],
  ],
  [
    "0 3 1 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.6923076923076923 },
      { token: EntityToken.AIR, weight: 0.15384615384615385 },
      { token: EntityToken.PASSABLE, weight: 0.15384615384615385 },
    ],
  ],
  [
    "4 4 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.9007843137254902 },
      { token: EntityToken.AIR, weight: 0.09019607843137255 },
      { token: EntityToken.PASSABLE, weight: 0.009019607843137255 },
    ],
  ],
  [
    "3 1 0 3",
    [
      { token: EntityToken.AIR, weight: 0.3333333333333333 },
      { token: EntityToken.PASSABLE, weight: 0.6666666666666666 },
    ],
  ],
  [
    "1 0 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8181818181818182 },
      { token: EntityToken.AIR, weight: 0.18181818181818182 },
    ],
  ],
  [
    "1 3 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.1 },
      { token: EntityToken.AIR, weight: 0.8 },
      { token: EntityToken.PASSABLE, weight: 0.1 },
    ],
  ],
  ["3 4 3 1", [{ token: EntityToken.PASSABLE, weight: 1.0 }]],
  [
    "0 0 4 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.3924050632911392 },
      { token: EntityToken.AIR, weight: 0.5569620253164557 },
      { token: EntityToken.PASSABLE, weight: 0.05063291139240506 },
    ],
  ],
  [
    "4 0 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.45296661604510746 },
      { token: EntityToken.AIR, weight: 0.5265290250708089 },
      { token: EntityToken.PASSABLE, weight: 0.020504358884083636 },
    ],
  ],
  [
    "4 0 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.0889967637540453 },
      { token: EntityToken.AIR, weight: 0.889967637540453 },
      { token: EntityToken.PASSABLE, weight: 0.021035598705501618 },
    ],
  ],
  [
    "4 0 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.693950177935943 },
      { token: EntityToken.AIR, weight: 0.28825622775800713 },
      { token: EntityToken.PASSABLE, weight: 0.017793594306049824 },
    ],
  ],
  [
    "4 0 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.13969237832874196 },
      { token: EntityToken.AIR, weight: 0.8500918273645547 },
      { token: EntityToken.PASSABLE, weight: 0.010215794306703397 },
    ],
  ],
  [
    "3 0 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.06921944035346098 },
      { token: EntityToken.AIR, weight: 0.8645066273932254 },
      { token: EntityToken.PASSABLE, weight: 0.0662739322533137 },
    ],
  ],
  [
    "3 0 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.11267605633802817 },
      { token: EntityToken.AIR, weight: 0.8028169014084507 },
      { token: EntityToken.PASSABLE, weight: 0.08450704225352113 },
    ],
  ],
  [
    "0 3 1 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.08333333333333333 },
      { token: EntityToken.AIR, weight: 0.5833333333333334 },
      { token: EntityToken.PASSABLE, weight: 0.3333333333333333 },
    ],
  ],
  ["1 2 3 1", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["4 4 2 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 0 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.04121700500877644 },
      { token: EntityToken.AIR, weight: 0.9483782055416069 },
      { token: EntityToken.IMPASSABLE_ALL, weight: 7.311868903455107e-5 },
      { token: EntityToken.PASSABLE, weight: 0.010331670760582065 },
    ],
  ],
  [
    "0 0 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.04702240566037736 },
      { token: EntityToken.AIR, weight: 0.9417010613207547 },
      { token: EntityToken.PASSABLE, weight: 0.011276533018867925 },
    ],
  ],
  ["0 4 2 4", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 0 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.13360160965794768 },
      { token: EntityToken.AIR, weight: 0.8567404426559356 },
      { token: EntityToken.PASSABLE, weight: 0.0096579476861167 },
    ],
  ],
  ["2 0 0 4", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 0 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.46153846153846156 },
      { token: EntityToken.AIR, weight: 0.5384615384615384 },
    ],
  ],
  [
    "4 4 3 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8571428571428571 },
      { token: EntityToken.AIR, weight: 0.11904761904761904 },
      { token: EntityToken.PASSABLE, weight: 0.023809523809523808 },
    ],
  ],
  [
    "3 0 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2714285714285714 },
      { token: EntityToken.AIR, weight: 0.6714285714285714 },
      { token: EntityToken.PASSABLE, weight: 0.05714285714285714 },
    ],
  ],
  ["4 1 4 3", [{ token: EntityToken.IMPASSABLE_GROUND, weight: 1.0 }]],
  [
    "0 4 1 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.19661016949152543 },
      { token: EntityToken.AIR, weight: 0.7762711864406779 },
      { token: EntityToken.PASSABLE, weight: 0.02711864406779661 },
    ],
  ],
  [
    "1 0 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.07582938388625593 },
      { token: EntityToken.AIR, weight: 0.9241706161137441 },
    ],
  ],
  [
    "0 0 0 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.06640106241699867 },
      { token: EntityToken.AIR, weight: 0.8658698539176627 },
      { token: EntityToken.PASSABLE, weight: 0.06772908366533864 },
    ],
  ],
  [
    "1 0 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.04644412191582003 },
      { token: EntityToken.AIR, weight: 0.9013062409288825 },
      { token: EntityToken.PASSABLE, weight: 0.05224963715529753 },
    ],
  ],
  ["1 4 3 4", [{ token: EntityToken.IMPASSABLE_GROUND, weight: 1.0 }]],
  ["0 5 5 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 3 3 4",
    [
      { token: EntityToken.AIR, weight: 0.625 },
      { token: EntityToken.PASSABLE, weight: 0.375 },
    ],
  ],
  [
    "2 0 0 0",
    [
      { token: EntityToken.AIR, weight: 0.9988713318284425 },
      { token: EntityToken.PASSABLE, weight: 0.001128668171557562 },
    ],
  ],
  [
    "1 3 4 1",
    [
      { token: EntityToken.AIR, weight: 0.75 },
      { token: EntityToken.PASSABLE, weight: 0.25 },
    ],
  ],
  ["0 2 3 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "1 0 1 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.75 },
      { token: EntityToken.PASSABLE, weight: 0.25 },
    ],
  ],
  [
    "0 1 0 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.07692307692307693 },
      { token: EntityToken.AIR, weight: 0.9230769230769231 },
    ],
  ],
  [
    "3 4 3 3",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.18181818181818182 },
      { token: EntityToken.AIR, weight: 0.2727272727272727 },
      { token: EntityToken.PASSABLE, weight: 0.5454545454545454 },
    ],
  ],
  [
    "1 0 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2807017543859649 },
      { token: EntityToken.AIR, weight: 0.6842105263157895 },
      { token: EntityToken.PASSABLE, weight: 0.03508771929824561 },
    ],
  ],
  [
    "0 1 3 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.14285714285714285 },
      { token: EntityToken.AIR, weight: 0.7142857142857143 },
      { token: EntityToken.PASSABLE, weight: 0.14285714285714285 },
    ],
  ],
  [
    "0 4 1 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.48484848484848486 },
      { token: EntityToken.AIR, weight: 0.4393939393939394 },
      { token: EntityToken.PASSABLE, weight: 0.07575757575757576 },
    ],
  ],
  [
    "1 0 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.37142857142857144 },
      { token: EntityToken.AIR, weight: 0.6285714285714286 },
    ],
  ],
  ["4 2 0 3", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["0 4 0 2", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["2 0 0 3", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["1 3 2 1", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 3 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.7333333333333333 },
      { token: EntityToken.AIR, weight: 0.2 },
      { token: EntityToken.PASSABLE, weight: 0.06666666666666667 },
    ],
  ],
  [
    "0 3 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4105263157894737 },
      { token: EntityToken.AIR, weight: 0.4631578947368421 },
      { token: EntityToken.PASSABLE, weight: 0.12631578947368421 },
    ],
  ],
  ["3 1 0 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["3 0 0 2", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["4 2 0 4", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 3 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.05923836389280677 },
      { token: EntityToken.AIR, weight: 0.8942172073342737 },
      { token: EntityToken.PASSABLE, weight: 0.0465444287729196 },
    ],
  ],
  ["2 3 0 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["1 0 2 1", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 3 0 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.08 },
      { token: EntityToken.AIR, weight: 0.84 },
      { token: EntityToken.PASSABLE, weight: 0.08 },
    ],
  ],
  [
    "0 0 4 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4910474550195693 },
      { token: EntityToken.AIR, weight: 0.4932196747959613 },
      { token: EntityToken.PASSABLE, weight: 0.015732870184469356 },
    ],
  ],
  ["0 4 2 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["0 0 2 3", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "3 4 3 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.2727272727272727 },
      { token: EntityToken.AIR, weight: 0.45454545454545453 },
      { token: EntityToken.PASSABLE, weight: 0.2727272727272727 },
    ],
  ],
  ["0 0 2 4", [{ token: EntityToken.AIR, weight: 1.0 }]],
  ["4 0 2 0", [{ token: EntityToken.AIR, weight: 1.0 }]],
  [
    "0 4 4 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.5857367593078133 },
      { token: EntityToken.AIR, weight: 0.3838489774514945 },
      { token: EntityToken.PASSABLE, weight: 0.030414263240692185 },
    ],
  ],
  [
    "0 4 4 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.8352668213457076 },
      { token: EntityToken.AIR, weight: 0.1554524361948956 },
      { token: EntityToken.PASSABLE, weight: 0.009280742459396751 },
    ],
  ],
  [
    "0 3 1 1",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.16666666666666666 },
      { token: EntityToken.AIR, weight: 0.5 },
      { token: EntityToken.PASSABLE, weight: 0.3333333333333333 },
    ],
  ],
  [
    "4 1 0 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.4166666666666667 },
      { token: EntityToken.AIR, weight: 0.5833333333333334 },
    ],
  ],
  [
    "0 3 1 0",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.12 },
      { token: EntityToken.AIR, weight: 0.82 },
      { token: EntityToken.PASSABLE, weight: 0.06 },
    ],
  ],
  [
    "0 1 0 4",
    [
      { token: EntityToken.IMPASSABLE_GROUND, weight: 0.39622641509433965 },
      { token: EntityToken.AIR, weight: 0.5660377358490566 },
      { token: EntityToken.PASSABLE, weight: 0.03773584905660377 },
    ],
  ],
  ["4 1 0 1", [{ token: EntityToken.AIR, weight: 1.0 }]],
]);
