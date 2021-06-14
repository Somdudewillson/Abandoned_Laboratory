export {};

declare global {
  /** @noSelf */
  namespace StageAPI {
    const StageOverride: {
      CatacombsOne: 1;
      CatacombsTwo: 2;
    };
    /** Creates a new custom stage
     * @param name IS NOT OPTIONAL. USED TO IDENTIFY STAGE AND FOR SAVING CURRENT STAGE.  MUST BE UNIQUE.
     * @param noSetReplaces replaces defaults to catacombs one if noSetReplaces is not set.
     */
    function CustomStage(
      name: string,
      StageOverrideStage: StageOverrideStage,
      noSetReplaces?: boolean,
    ): CustomStage;
    function RoomGfx(
      Backdrop: Backdrop,
      GridGfx: GridGfx | null,
      shadingName: string,
      shadingPrefix: string,
    ): RoomGfx;

    /** Teleports the player(s) to a specified stage */
    function GotoCustomStage(
      CustomStage: CustomStage,
      playTransition?: boolean,
      noForgetSeed?: boolean,
    ): void;
    /** Convenience function that assembles filenames and packages them in a `Backdrop` for you.
     * @param prefix the path to the directory containing the backdrop spritesheets
     * @param suffix generally the file extension, i.e. `".png"`
     */
    function BackdropHelper(
      backdrop: {
        Walls: string[];
        NFloors: string[];
        LFloors: string[];
        Corners: string[];
      },
      prefix: string,
      suffix: string,
    ): Backdrop;
  }
}
