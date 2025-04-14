
  
const StylesFilter = [
    {
      type: "Single Brested",
      name: "Coat",
      pos: "F",
      n: 0,
      place: "Coat",
      attr: [
        [
          {value: "1B" , name: "Single Button" },
          {value: "2B" , name: "Double Button" },
          {value: "3B" , name: "Three Button" },
        ],
      ],
    },
    {
      type: "Double Brested",
      name: "Coat",
      pos: "F",
      n: 0,
      attr: [
        [
          {value: "4B" , name: "Four Button"},
          {value: "6B" , name: "Six Button"},
        ],
      ],
    },
    {
      type: "Jodhpuri",
      name: "Coat",
      pos: "F",
      n: 0,
      attr: [
        [
          {value: "JH" , name: "Semi Round"},
          {value: "JR" , name: "Round"},
          {value: "JS" , name: "Straight"},
        ],
      ],
    },
    {
      type: "Back Style",
      name: "Coat",
      pos: "B",
      n: 0,
      attr: [
        [
          {value: "NV" , name: "Non Vent"},
          {value: "1V" , name: "Single Vent"},
          {value: "2V" , name: "Side Vent"},
        ],
      ],
    },
    {
      type: "Lapel",
      name: "Coat",
      pos: "F",
      n: 1,
      attr: [
        [
          {value: "N" , name: "Notch"},
          {value: "P" , name: "Peak"},
        ],
      ],
    },
    {
      type: "Pocket",
      name: "Coat",
      pos: "F",
      n: 2,
      attr: [
        [
          {value: "FL" , name: "Flap"},
          {value: "PT" , name: "Patch"},
        ],
      ],
    },
    {
      type: "Style",
      name: "Pant",
      pos: "F",
      n: 0,
      place: "Pant",
      attr: [
        [
          {value: "F-NP" , name: "Non Plates"},
          {value: "F-SP" , name: "Single Plates"},
          {value: "F-DP" , name: "Double Plates"},
        ],
      ],
    },
    {
      type: "Back Pocket",
      name: "Pant",
      pos: "B",
      n: 0,
      attr: [
        [
          {value: "B-SP" , name: "Single Pocket"},
          {value: "B-DP" , name: "Double Pocket"},
        ],
      ],
    },
  
    {
      type: "Collar",
      name: "Shirt",
      pos: "F",
      n: 2,
      place: "Shirt",
      attr: [
        [
          {value: "SD" , name: "Standard"},
          {value: "SS" , name: "Semi Spread"},
          {value: "S0" , name: "Spread"},
        ],
        [
          {value: "BD" , name: "Button Down"},
          {value: "0" , name: "Mandarin"},
        ],
      ],
    },
    {
        type: "Cuffs",
        name: "Shirt",
        pos: "F",
        n: 4,
        attr: [
          [
            { name: "Square", value: "S" },
            { name: "Round", value: "R" },
            { name: "Notch", value: "N" },
          ],
          [
            { name: "2 Button Square",value: "X" },
            { name: "2 Button Round", value: "Y" },
            { name: "2 Button Notch", value: "Z" },
          ],
          [{ name: "Cufflinks",value: "C" }],
        ],
      },
      {
        type: "Pocket",
        name: "Shirt",
        pos: "F",
        n: 1,
        attr: [
          [
            { name: "No Pocket", value: "0" },
            { name: "1 Pocket", value: "P1" },
          ],
        ],
      },
      {
        type: "Style",
        name: "Vest",
        pos: "F",
        n: 0,
        place: "Vest Coat",
        attr: [
          [
            { name: "Single Brested", value: "SB" },
            { name: "Double Brested", value: "DB" },
          ],
        ],
      },
    ];


    module.exports = { StylesFilter }