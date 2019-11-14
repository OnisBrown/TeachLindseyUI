var goToJSON ={
      "message0": 'Go to %1',
      "args0": [
        {
          "type": "input_value",
          "name": "exhibit",
          "check": "String"
        }
      ],
      "nextStatement": null,
      "previousStatement": null,
      "style":"procedure_blocks",
      "tooltip": "Insert a Location Block"
};

Blockly.Blocks['goTo'] = {
  init: function() {
    this.jsonInit(goToJSON);
  }
};

var goToNodeJSON ={
      "message0": 'Go to waypoint # %1',
      "args0": [
        {
          "type": "field_number",
          "name": "waypoint",
        }
      ],
      "nextStatement": null,
      "previousStatement": null,
      "style":"procedure_blocks",
      "tooltip": "type a waypoint"
};

Blockly.Blocks['goToNode'] = {
  init: function() {
    this.jsonInit(goToNodeJSON);
  }
};

goToDescribeWhileJSON = {
      "message0": 'Go to %1 and give the standard talk.',
      "args0": [
        {
          "type": "input_value",
          "name": "exhibit",
          "check": "String"
        }
      ],
      "message1": 'While going to exhibit do %1',
      "args1": [
        {"type": "input_statement", "name": "DO"}
      ],
      "nextStatement": null,
      "previousStatement": null,
      "style":"procedure_blocks",
      "tooltip": "Insert an exhibitLs Block to get the premade talk on that exhibit",
    };

Blockly.Blocks['goToDescribeWhile'] = {
  init: function() {
    this.jsonInit(goToDescribeWhileJSON);
  }
};

goToDescribeJSON = {
      "message0": 'Go to %1 and give the standard talk',
      "args0": [
        {
          "type": "input_value",
          "name": "exhibit",
          "check": "String"
        }
      ],
      "message1": 'behaviour toggles: gaze %1 pivoting %2',
      "args1": [
        {
          "type": "field_checkbox",
          "name":"gaze",
          "checked": true
        },
        {
          "type": "field_checkbox",
          "name":"pivot",
          "checked": true
        }
      ],
      "nextStatement": null,
      "previousStatement": null,
      "style":"procedure_blocks",
      "tooltip": "Insert an exhibitLs Block to get the premade talk on that exhibit",
    };

Blockly.Blocks['goToDescribe'] = {
  init: function() {
    this.jsonInit(goToDescribeJSON);
  }
};

moveJSON = {
  "message0": 'move forward: %1 y: %2 metres and turn %3 \xB0',
  "args0": [
    {
      "type": "field_number",
      "name": "x",
      "min": -10,
      "max": 10
    },
    {
      "type": "field_number",
      "name": "y",
      "min": -10,
      "max": 10
    },
    {
      "type": "field_number",
      "name": "D",
      "min": -180,
      "max": 360
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "style":"logic_blocks",
  "tooltip": "move Lindsey x, y, z metres +- 10 metre per move"
};

Blockly.Blocks['move'] = {
  init: function() {
    this.jsonInit(moveJSON);
  }
};

exhibitLsJSON = {
  "message0": 'exhibit: %1',
  "args0": [
    {
      "type": "field_dropdown",
      "name": "exhibit",
      "options": []
    }
  ],
  "output": "String",
  "style":"procedure_blocks",
  "tooltip": "Pick an exhibit from the drop down menu"
};

Blockly.Blocks['exhibitLs'] = {
  init: function() {
    this.jsonInit(exhibitLsJSON);
  }
};

startTourJSON = {
  "message0": 'choose a stock tour: %1',
  "args0": [
    {
      "type": "field_dropdown",
      "name": "tour",
      "options": []
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "style":"procedure_blocks",
  "tooltip": "Pick a tour from one of the pre-established ones"
};



Blockly.Blocks['startTour'] = {
  init: function() {
    this.jsonInit(startTourJSON);
  }
};

gazePosJSON = {
  "message0": 'look towards x: %1 y: %2 z: %3 for %4 seconds',
  "args0": [
    {
      "type": "field_number",
      "name": "x",
    },
    {
      "type": "field_number",
      "name": "y",
    },
    {
      "type": "field_number",
      "name": "z",
    },
    {
      "type": "field_number",
      "name": "T",
      "min": 1,
      "max": 60
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "style":"logic_blocks",
  "tooltip": "look at a certain spot for a number of seconds",
};

Blockly.Blocks['gazePos'] = {
  init: function() {
    this.jsonInit(gazePosJSON);
  }
};

gazePerJSON = {
  "message0": 'look towards nearest person for %1 seconds',
  "args0": [
    {
      "type": "field_number",
      "name": "T",
      "min": 1,
      "max": 60
    }
  ],
  "nextStatement": null,
  "previousStatement": null,
  "style":"logic_blocks",
  "tooltip": "have lindsey look at hte nearest person",
};

Blockly.Blocks['gazePer'] = {
  init: function() {
    this.jsonInit(gazePerJSON);
  }
};
