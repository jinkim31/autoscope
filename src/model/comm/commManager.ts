import {SerialPort} from "serialport";
import {Dh232} from "./plugin/dh232";
import Plugin from "./plugin/plugin";

const dh232 = new Dh232()

const plugins:Plugin<any>[] = [new Dh232()]

export default {dh232}