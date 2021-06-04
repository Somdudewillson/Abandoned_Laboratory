import { CollectibleTypeLabUpgrade } from "../../../../constants";

export function ownType(): number {
  return CollectibleTypeLabUpgrade.COLLECTIBLE_PORTALGENERATOR as number;
}

export function use(
  _type: CollectibleType,
  rand: RNG,
  player: EntityPlayer,
  _UseFlags: int,
  _ActiveSlot: int,
  _CustomVarData: int,
): boolean {
  const newPortal = Isaac.Spawn(
    EntityType.ENTITY_PORTAL,
    1,
    0,
    player.Position,
    Vector.Zero,
    player,
  ).ToNPC()!;
  newPortal.Parent = player;
  newPortal.AddCharmed(EntityRef(player), -1);
  newPortal.MakeChampion(rand.Next(), ChampionColor.GIANT);
  newPortal.AddEntityFlags(EntityFlag.FLAG_PERSISTENT);

  return true;
}
