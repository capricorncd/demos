/**
 * Created by dev3cli.
 * https://github.com/capricorncd/dev3cli
 * Date: 2021-05-30 15:16:57
 */
import * as PIXI from "pixi.js";
import {SkeletonData} from "pixi-spine";

export type AnyObject = Record<string, any>;

export interface SpineResource extends PIXI.Resource {
  spineData: SkeletonData;
}
