import Color from "../util/Color";
import dark from './Dark.module.css';
import light from './Light.module.css';
export function resolveTheme(color: Color) {
    return color === Color.black ? dark : light;
}