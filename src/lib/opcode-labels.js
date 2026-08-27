import {defineMessages} from 'react-intl';

const messages = defineMessages({
    motion_direction: {
        defaultMessage: 'direction',
        description: 'Label for the direction monitor when shown on the stage',
        id: 'gui.opcodeLabels.direction'
    },
    motion_xposition: {
        defaultMessage: 'x position',
        description: 'Label for the x position monitor when shown on the stage',
        id: 'gui.opcodeLabels.xposition'
    },
    motion_yposition: {
        defaultMessage: 'y position',
        description: 'Label for the y position monitor when shown on the stage',
        id: 'gui.opcodeLabels.yposition'
    },

    // Looks
    looks_size: {
        defaultMessage: 'size',
        description: 'Label for the size monitor when shown on the stage',
        id: 'gui.opcodeLabels.size'
    },
    looks_costumename: {
        defaultMessage: 'costume name',
        description: 'Label for the costume name monitor when shown on the stage',
        id: 'gui.opcodeLabels.costumename'
    },
    looks_costumenumber: {
        defaultMessage: 'costume number',
        description: 'Label for the costume number monitor when shown on the stage',
        id: 'gui.opcodeLabels.costumenumber'
    },
    looks_backdropname: {
        defaultMessage: 'backdrop name',
        description: 'Label for the backdrop name monitor when shown on the stage',
        id: 'gui.opcodeLabels.backdropname'
    },
    looks_backdropnumber: {
        defaultMessage: 'backdrop number',
        description: 'Label for the backdrop number monitor when shown on the stage',
        id: 'gui.opcodeLabels.backdropnumber'
    },

    // pm looks
    looks_getEffectValue_color: {
        defaultMessage: 'color',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.color'
    },
    looks_getEffectValue_fisheye: {
        defaultMessage: 'fisheye',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.fisheye'
    },
    looks_getEffectValue_whirl: {
        defaultMessage: 'whirl',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.whirl'
    },
    looks_getEffectValue_pixelate: {
        defaultMessage: 'pixelate',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.pixelate'
    },
    looks_getEffectValue_mosaic: {
        defaultMessage: 'mosaic',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.mosaic'
    },
    looks_getEffectValue_brightness: {
        defaultMessage: 'brightness',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.brightness'
    },
    looks_getEffectValue_ghost: {
        defaultMessage: 'ghost',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.ghost'
    },
    looks_getEffectValue_saturation: {
        defaultMessage: 'saturation',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.saturation'
    },
    looks_getEffectValue_red: {
        defaultMessage: 'red',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.red'
    },
    looks_getEffectValue_green: {
        defaultMessage: 'green',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.green'
    },
    looks_getEffectValue_blue: {
        defaultMessage: 'blue',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.blue'
    },
    looks_getEffectValue_opaque: {
        defaultMessage: 'opaque',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.opaque'
    },
    looks_getEffectValue_horizShear: {
        defaultMessage: 'horizontal shear',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.horizShear'
    },
    looks_getEffectValue_vertiShear: {
        defaultMessage: 'vertical shear',
        description: 'Label for the effect monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getEffectValue.vertiShear'
    },
    looks_getSpriteVisible: {
        defaultMessage: 'visible?',
        description: 'Label for the visibility monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.spriteVisible'
    },
    looks_layersGetLayer: {
        defaultMessage: 'layer',
        description: 'Label for the layer monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.getLayer'
    },
    looks_stretchGetX: {
        defaultMessage: 'stretch x',
        description: 'Label for the stretch x monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.stretchX'
    },
    looks_stretchGetY: {
        defaultMessage: 'stretch y',
        description: 'Label for the stretch y monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.stretchY'
    },
    looks_tintColor: {
        defaultMessage: 'tint color',
        description: 'Label for the tint color monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.tintColor'
    },

    // Sound
    sound_volume: {
        defaultMessage: 'volume',
        description: 'Label for the volume monitor when shown on the stage',
        id: 'gui.opcodeLabels.volume'
    },
    sound_getEffectValue: {
        defaultMessage: 'effect',
        description: 'Label for the sound effect monitor with no effect chosen when shown on the stage',
        id: 'pm.opcodeLabels.soundgetEffectValue'
    },
    sound_getEffectValue_pitch: {
        defaultMessage: 'pitch',
        description: 'Label for the pitch effect monitor when shown on the stage',
        id: 'pm.opcodeLabels.soundgetEffectValue.pitch'
    },
    sound_getEffectValue_pan: {
        defaultMessage: 'pan left/right',
        description: 'Label for the pan left/right effect monitor when shown on the stage',
        id: 'pm.opcodeLabels.soundgetEffectValue.pan'
    },
    sound_tempo: {
        defaultMessage: 'tempo',
        description: 'Label for the tempo monitor when shown on the stage',
        id: 'gui.opcodeLabels.tempo'
    },

    // pm control
    control_get_counter: {
        defaultMessage: 'counter',
        id: 'pm.gui.opcodeLabels.getCounter'
    },

    // Sensing
    sensing_answer: {
        defaultMessage: 'answer',
        description: 'Label for the answer monitor when shown on the stage',
        id: 'gui.opcodeLabels.answer'
    },
    sensing_mousedown: {
        defaultMessage: 'mouse down?',
        description: 'Label for the mouse down monitor when show on the stage',
        id: 'tw.opcode.mousedown'
    },
    sensing_mousex: {
        defaultMessage: 'mouse x',
        description: 'Label for the mouse x monitor when show on the stage',
        id: 'tw.opcode.mousex'
    },
    sensing_mousey: {
        defaultMessage: 'mouse y',
        description: 'Label for the mouse y monitor when show on the stage',
        id: 'tw.opcode.mousey'
    },
    sensing_loudness: {
        defaultMessage: 'loudness',
        description: 'Label for the loudness monitor when shown on the stage',
        id: 'gui.opcodeLabels.loudness'
    },
    sensing_username: {
        defaultMessage: 'username',
        description: 'Label for the username monitor when shown on the stage',
        id: 'gui.opcodeLabels.username'
    },
    sensing_current_year: {
        defaultMessage: 'year',
        description: 'Label for the current year monitor when shown on the stage',
        id: 'gui.opcodeLabels.year'
    },
    sensing_current_month: {
        defaultMessage: 'month',
        description: 'Label for the current month monitor when shown on the stage.',
        id: 'gui.opcodeLabels.month'
    },
    sensing_current_date: {
        defaultMessage: 'date',
        description: 'Label for the current date monitor when shown on the stage. Shows the current day of the month',
        id: 'gui.opcodeLabels.date'
    },
    sensing_current_dayofweek: {
        defaultMessage: 'day of week',
        description: 'Label for the current day of week monitor when shown on the stage',
        id: 'gui.opcodeLabels.dayofweek'
    },
    sensing_current_hour: {
        defaultMessage: 'hour',
        description: 'Label for the current hour monitor when shown on the stage',
        id: 'gui.opcodeLabels.hour'
    },
    sensing_current_minute: {
        defaultMessage: 'minute',
        description: 'Label for the current minute monitor when shown on the stage',
        id: 'gui.opcodeLabels.minute'
    },
    sensing_current_second: {
        defaultMessage: 'second',
        description: 'Label for the current second monitor when shown on the stage',
        id: 'gui.opcodeLabels.second'
    },
    sensing_current_timestamp: {
        defaultMessage: 'timestamp',
        description: 'Label for the current timestamp monitor when shown on the stage',
        id: 'pm.gui.opcodeLabels.timestamp'
    },
    sensing_timer: {
        defaultMessage: 'timer',
        description: 'Label for the timer monitor when shown on the stage',
        id: 'gui.opcodeLabels.timer'
    },
    sensing_dayssince2000: {
        defaultMessage: 'days since 2000',
        description: 'Label for the days since 2000 monitor when shown on the stage',
        id: 'tw.opcode.2000'
    },
    sensing_online: {
        defaultMessage: 'online?',
        description: 'Name of "online?" block',
        id: 'tw.opcode.online'
    },

    //pm sensing
    sensing_getclipboard: {
        defaultMessage: 'clipboard',
        id: 'pm.gui.opcodeLabels.getClipboard'
    },
    sensing_mouse_any: {
        defaultMessage: 'any',
        id: 'pm.gui.opcodeLabels.mouseAny'
    },
    sensing_mouseclicked: {
        defaultMessage: 'mouse clicked?',
        id: 'pm.gui.opcodeLabels.mouseClicked'
    },
    sensing_mouse_button_clicked: {
        defaultMessage: '{BUTTON} mouse clicked?',
        id: 'pm.gui.opcodeLabels.mouseButtonClicked'
    },
    sensing_mouse_button_down: {
        defaultMessage: '{BUTTON} mouse down?',
        id: 'pm.gui.opcodeLabels.mouseButtonDown'
    },
    sensing_mouse_button_released: {
        defaultMessage: '{BUTTON} mouse released?',
        id: 'pm.gui.opcodeLabels.mouseButtonReleased'
    },
    sensing_mouse_left: {
        defaultMessage: 'left',
        id: 'pm.gui.opcodeLabels.mouseLeft'
    },
    sensing_mouse_middle: {
        defaultMessage: 'middle',
        id: 'pm.gui.opcodeLabels.mouseMiddle'
    },
    sensing_mouse_right: {
        defaultMessage: 'right',
        id: 'pm.gui.opcodeLabels.mouseRight'
    }
});

class OpcodeLabels {
    constructor () {
        /**
         * Translation function for labels. By default just return the defaultMessage
         * @private
         * @param {object} message A message object compatible with react-intl formatMessage
         * @return {string} Return the default string initially
         */
        this._translator = message => message.defaultMessage;

        /**
         * Initial opcode map, with categories defined
         * @private
         */
        this._opcodeMap = {
            // Motion
            motion_direction: {category: 'motion'},
            motion_xposition: {category: 'motion'},
            motion_yposition: {category: 'motion'},

            // Looks
            looks_size: {category: 'looks'},
            looks_costumenumbername: {category: 'looks'},
            looks_backdropnumbername: {category: 'looks'},
            looks_backdropname: {category: 'looks'},

            // pm looks
            looks_getEffectValue: {category: 'looks'},
            looks_getSpriteVisible: {category: 'looks'},
            looks_layersGetLayer: {category: 'looks'},
            looks_stretchGetX: {category: 'looks'},
            looks_stretchGetY: {category: 'looks'},
            looks_tintColor: {category: 'looks'},

            // Data
            data_variable: {category: 'data'},
            data_listcontents: {category: 'list'},

            // Sound
            sound_volume: {category: 'sound'},
            sound_getEffectValue: {category: 'sound'},
            sound_tempo: {category: 'sound'},

            // pm control
            control_get_counter: {category: 'control'},

            // Sensing
            sensing_answer: {category: 'sensing'},
            sensing_mousedown: {category: 'sensing'},
            sensing_mousex: {category: 'sensing'},
            sensing_mousey: {category: 'sensing'},
            sensing_loudness: {category: 'sensing'},
            sensing_username: {category: 'sensing'},
            sensing_current: {category: 'sensing'},
            sensing_timer: {category: 'sensing'},
            sensing_dayssince2000: {category: 'sensing'},
            sensing_online: {category: 'sensing'},

            // pm sensing
            sensing_getclipboard: {category: 'sensing'},
            sensing_mouseclicked: {category: 'sensing'},
            sensing_mouse_button_clicked: {category: 'sensing'},
            sensing_mouse_button_down: {category: 'sensing'},
            sensing_mouse_button_released: {category: 'sensing'},
        };

        // Initialize opcodeMap with default strings
        this._refreshOpcodeMap();
    }

    /**
     * Set the translation function for monitor labels. The function should accept
     * a message object as defined by react-intl defineMessages
     * @param {function} translator the function to use for localization
     */
    setTranslatorFunction (translator) {
        this._translator = translator;
        this._refreshOpcodeMap();
    }

    /**
     * Internal function to update opcode Map when translation function is defined
     * @private
     */
    _refreshOpcodeMap () {
        // Motion
        this._opcodeMap.motion_direction.labelFn = () => this._translator(messages.motion_direction);
        this._opcodeMap.motion_xposition.labelFn = () => this._translator(messages.motion_xposition);
        this._opcodeMap.motion_yposition.labelFn = () => this._translator(messages.motion_yposition);

        // Looks
        this._opcodeMap.looks_size.labelFn = () => this._translator(messages.looks_size);
        this._opcodeMap.looks_costumenumbername.labelFn = params => {
            if (params.NUMBER_NAME === 'number') {
                return this._translator(messages.looks_costumenumber);
            }
            return this._translator(messages.looks_costumename);
        };
        this._opcodeMap.looks_backdropnumbername.labelFn = params => {
            if (params.NUMBER_NAME === 'number') {
                return this._translator(messages.looks_backdropnumber);
            }
            return this._translator(messages.looks_backdropname);
        };
        this._opcodeMap.looks_backdropname.labelFn = () => this._translator(messages.looks_backdropname);

        // pm looks
        this._opcodeMap.looks_getEffectValue.labelFn = params => {
            switch (params.EFFECT.toLowerCase()) {
                case 'color': return this._translator(messages.looks_getEffectValue_color);
                case 'fisheye': return this._translator(messages.looks_getEffectValue_fisheye);
                case 'whirl': return this._translator(messages.looks_getEffectValue_whirl);
                case 'pixelate': return this._translator(messages.looks_getEffectValue_pixelate);
                case 'mosaic': return this._translator(messages.looks_getEffectValue_mosaic);
                case 'brightness': return this._translator(messages.looks_getEffectValue_brightness);
                case 'ghost': return this._translator(messages.looks_getEffectValue_ghost);
                case 'saturation': return this._translator(messages.looks_getEffectValue_saturation);
                case 'red': return this._translator(messages.looks_getEffectValue_red);
                case 'green': return this._translator(messages.looks_getEffectValue_green);
                case 'blue': return this._translator(messages.looks_getEffectValue_blue);
                case 'opaque': return this._translator(messages.looks_getEffectValue_opaque);
                case 'horizontal_shear': return this._translator(messages.looks_getEffectValue_horizShear);
                case 'vertical_shear': return this._translator(messages.looks_getEffectValue_vertiShear);
            }
        }
        this._opcodeMap.looks_getSpriteVisible.labelFn = () => this._translator(messages.looks_getSpriteVisible);
        this._opcodeMap.looks_layersGetLayer.labelFn = () => this._translator(messages.looks_layersGetLayer);
        this._opcodeMap.looks_stretchGetX.labelFn = () => this._translator(messages.looks_stretchGetX);
        this._opcodeMap.looks_stretchGetY.labelFn = () => this._translator(messages.looks_stretchGetY);
        this._opcodeMap.looks_tintColor.labelFn = () => this._translator(messages.looks_tintColor);

        // Data
        this._opcodeMap.data_variable.labelFn = params => params.VARIABLE;
        this._opcodeMap.data_listcontents.labelFn = params => params.LIST;

        // Sound
        this._opcodeMap.sound_volume.labelFn = () => this._translator(messages.sound_volume);
        this._opcodeMap.sound_getEffectValue.labelFn = params => {
            const effect = params.EFFECT.toLowerCase();
            if (messages[`sound_getEffectValue_${effect}`]) {
                return this._translator(messages[`sound_getEffectValue_${effect}`]);
            }
            return this._translator(messages.sound_getEffectValue);
        };
        this._opcodeMap.sound_tempo.labelFn = () => this._translator(messages.sound_tempo);

        // pm control
        this._opcodeMap.control_get_counter.labelFn = () => this._translator(messages.control_get_counter);

        // Sensing
        this._opcodeMap.sensing_answer.labelFn = () => this._translator(messages.sensing_answer);
        this._opcodeMap.sensing_mousedown.labelFn = () => this._translator(messages.sensing_mousedown);
        this._opcodeMap.sensing_mousex.labelFn = () => this._translator(messages.sensing_mousex);
        this._opcodeMap.sensing_mousey.labelFn = () => this._translator(messages.sensing_mousey);
        this._opcodeMap.sensing_loudness.labelFn = () => this._translator(messages.sensing_loudness);
        this._opcodeMap.sensing_username.labelFn = () => this._translator(messages.sensing_username);
        this._opcodeMap.sensing_current.labelFn = params => {
            switch (params.CURRENTMENU.toLowerCase()) {
            case 'year':
                return this._translator(messages.sensing_current_year);
            case 'month':
                return this._translator(messages.sensing_current_month);
            case 'date':
                return this._translator(messages.sensing_current_date);
            case 'dayofweek':
                return this._translator(messages.sensing_current_dayofweek);
            case 'hour':
                return this._translator(messages.sensing_current_hour);
            case 'minute':
                return this._translator(messages.sensing_current_minute);
            case 'second':
                return this._translator(messages.sensing_current_second);
            case 'timestamp':
                return this._translator(messages.sensing_current_timestamp);
            }
        };
        this._opcodeMap.sensing_timer.labelFn = () => this._translator(messages.sensing_timer);
        this._opcodeMap.sensing_dayssince2000.labelFn = () => this._translator(messages.sensing_dayssince2000);
        this._opcodeMap.sensing_online.labelFn = () => this._translator(messages.sensing_online);

        //pm sensing
        const buttonMap = button => {
            switch (button) {
                case 'left': return this._translator(messages.sensing_mouse_left);
                case 'middle': return this._translator(messages.sensing_mouse_middle);
                case 'right': return this._translator(messages.sensing_mouse_right);
            }
            return this._translator(messages.sensing_mouse_any);
        }

        this._opcodeMap.sensing_getclipboard.labelFn = () => this._translator(messages.sensing_getclipboard);
        this._opcodeMap.sensing_mouse_button_clicked.labelFn = params => this._translator(messages.sensing_mouse_button_clicked, {BUTTON: buttonMap(params.BUTTON_OPTION)});
        this._opcodeMap.sensing_mouse_button_down.labelFn = params => this._translator(messages.sensing_mouse_button_down, {BUTTON: buttonMap(params.BUTTON_OPTION)});
        this._opcodeMap.sensing_mouse_button_released.labelFn = params => this._translator(messages.sensing_mouse_button_released, {BUTTON: buttonMap(params.BUTTON_OPTION)});
        this._opcodeMap.sensing_mouseclicked.labelFn = () => this._translator(messages.sensing_mouseclicked);
    }

    /**
     * Return the label for an opcode
     * @param {string} opcode the opcode you want a label for
     * @return {object} object with  label and category
     */
    getLabel (opcode) {
        if (opcode in this._opcodeMap) return this._opcodeMap[opcode];
        return {
            category: 'extension',
            label: opcode
        };
    }
}

export default new OpcodeLabels();
