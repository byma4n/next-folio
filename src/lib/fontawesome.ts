/**
 * Font Awesome global setup.
 *
 * Disables the library's automatic CSS injection so that we can
 * import the stylesheet ourselves in the root layout. Doing this
 * prevents the FOUC (large icons flashing before CSS loads) that
 * otherwise happens with server-rendered icons.
 */

import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
