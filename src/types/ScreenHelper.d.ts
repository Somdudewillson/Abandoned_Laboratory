export {};

declare global {
  /** @noSelf */
  namespace ScreenHelper {
    /** Sets the screen offset.  You probably shouldn't play with this. */
    function SetOffset(num: number): number;
    /** Gets the current screen offset. */
    function GetOffset(): number;
    /** Gets the current screen size. Based off of code from kilburn. */
    function GetScreenSize(): Vector;
    /** Gets the center of the screen. */
    function GetScreenCenter(): Vector;
    /** Gets the bottom-right corner of the screen.
     * @param offset if provided, overrides internal hud offset value.
     */
    function GetScreenBottomRight(offset?: number): Vector;
    /** Gets the bottom-left corner of the screen.
     * @param offset if provided, overrides internal hud offset value.
     */
    function GetScreenBottomLeft(offset?: number): Vector;
    /** Gets the top-right corner of the screen.
     * @param offset if provided, overrides internal hud offset value.
     */
    function GetScreenTopRight(offset?: number): Vector;
    /** Gets the top-left corner of the screen.
     * @param offset if provided, overrides internal hud offset value.
     */
    function GetScreenTopLeft(offset?: number): Vector;
  }
}
