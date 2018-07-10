/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2018 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

var BitmapText = require('../static/BitmapText');
var Class = require('../../../utils/Class');
var Components = require('../../components');
var GameObject = require('../../GameObject');
var GetBitmapTextSize = require('../GetBitmapTextSize');
var Render = require('./DynamicBitmapTextRender');

/**
 * @typedef {object} DisplayCallbackConfig
 * @property {{topLeft:number,topRight:number,bottomLeft:number,bottomRight:number}} tint - The tint of the character being rendered.
 * @property {number} index - The index of the character being rendered.
 * @property {number} charCode - The character code of the character being rendered.
 * @property {number} x - The x position of the character being rendered.
 * @property {number} y - The y position of the character being rendered.
 * @property {number} scale - The scale of the character being rendered.
 * @property {number} rotation - The rotation of the character being rendered.
 * @property {any} data - Custom data stored with the character being rendered.
 */

/**
 * @callback DisplayCallback
 *
 * @param {DisplayCallbackConfig} display - Settings of the character that is about to be rendered.
 *
 * @return {{x:number, y:number, scale:number, rotation:number}} Altered position, scale and rotation values for the character that is about to be rendered.
 */

/**
 * @classdesc
 * [description]
 *
 * @class DynamicBitmapText
 * @extends Phaser.GameObjects.BitmapText
 * @memberOf Phaser.GameObjects
 * @constructor
 * @since 3.0.0
 *
 * @param {Phaser.Scene} scene - The Scene to which this Game Object belongs. It can only belong to one Scene at any given time.
 * @param {number} x - The x coordinate of this Game Object in world space.
 * @param {number} y - The y coordinate of this Game Object in world space.
 * @param {string} font - The key of the font to use from the Bitmap Font cache.
 * @param {(string|string[])} [text] - The string, or array of strings, to be set as the content of this Bitmap Text.
 * @param {number} [size] - The font size of this Bitmap Text.
 * @param {integer} [align=0] - The alignment of the text in a multi-line BitmapText object.
 */
var DynamicBitmapText = new Class({

    Extends: BitmapText,

    Mixins: [
        Render
    ],

    initialize:

    function DynamicBitmapText (scene, x, y, font, text, size, align)
    {
        BitmapText.call(this, scene, x, y, font, text, size, align);

        this.type = 'DynamicBitmapText';

        /**
         * The horizontal scroll position of the Bitmap Text.
         *
         * @name Phaser.GameObjects.DynamicBitmapText#scrollX
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.scrollX = 0;

        /**
         * The vertical scroll position of the Bitmap Text.
         *
         * @name Phaser.GameObjects.DynamicBitmapText#scrollY
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.scrollY = 0;

        /**
         * The crop width of the Bitmap Text.
         *
         * @name Phaser.GameObjects.DynamicBitmapText#cropWidth
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.cropWidth = 0;

        /**
         * The crop height of the Bitmap Text.
         *
         * @name Phaser.GameObjects.DynamicBitmapText#cropHeight
         * @type {number}
         * @default 0
         * @since 3.0.0
         */
        this.cropHeight = 0;

        /**
         * A callback that alters how each character of the Bitmap Text is rendered.
         *
         * @name Phaser.GameObjects.DynamicBitmapText#displayCallback
         * @type {DisplayCallback}
         * @since 3.0.0
         */
        this.displayCallback;

        /**
         * A callback that alters how each character of the Bitmap Text is rendered.
         *
         * @name Phaser.GameObjects.DynamicBitmapText#callbackData
         * @type {object}
         * @since 3.11.0
         */
        this.callbackData = {
            color: 0,
            tint: {
                topLeft: 0,
                topRight: 0,
                bottomLeft: 0,
                bottomRight: 0
            },
            index: 0,
            charCode: 0,
            x: 0,
            y: 0,
            scale: 0,
            rotation: 0,
            data: 0
        };
    },

    /**
     * Set the crop size of this Bitmap Text.
     *
     * @method Phaser.GameObjects.DynamicBitmapText#setSize
     * @since 3.0.0
     *
     * @param {number} width - The width of the crop.
     * @param {number} height - The height of the crop.
     *
     * @return {Phaser.GameObjects.DynamicBitmapText} This Game Object.
     */
    setSize: function (width, height)
    {
        this.cropWidth = width;
        this.cropHeight = height;

        return this;
    },

    /**
     * Set a callback that alters how each character of the Bitmap Text is rendered.
     *
     * The callback receives a {@link DisplayCallbackConfig} object that contains information about the character that's
     * about to be rendered.
     *
     * It should return an object with `x`, `y`, `scale` and `rotation` properties that will be used instead of the
     * usual values when rendering.
     *
     * @method Phaser.GameObjects.DynamicBitmapText#setDisplayCallback
     * @since 3.0.0
     *
     * @param {DisplayCallback} callback - The display callback to set.
     *
     * @return {Phaser.GameObjects.DynamicBitmapText} This Game Object.
     */
    setDisplayCallback: function (callback)
    {
        this.displayCallback = callback;

        return this;
    },

    /**
     * Set the horizontal scroll position of this Bitmap Text.
     *
     * @method Phaser.GameObjects.DynamicBitmapText#setScrollX
     * @since 3.0.0
     *
     * @param {number} value - The horizontal scroll position to set.
     *
     * @return {Phaser.GameObjects.DynamicBitmapText} This Game Object.
     */
    setScrollX: function (value)
    {
        this.scrollX = value;

        return this;
    },

    /**
     * Set the vertical scroll position of this Bitmap Text.
     *
     * @method Phaser.GameObjects.DynamicBitmapText#setScrollY
     * @since 3.0.0
     *
     * @param {number} value - The vertical scroll position to set.
     *
     * @return {Phaser.GameObjects.DynamicBitmapText} This Game Object.
     */
    setScrollY: function (value)
    {
        this.scrollY = value;

        return this;
    }

});

module.exports = DynamicBitmapText;
