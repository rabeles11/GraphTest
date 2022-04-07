import { BigInt } from "@graphprotocol/graph-ts"
import {
  New_User_Contract,
  NewUser,
} from "../generated/New_User_Contract/New_User_Contract"

import {NameOfUsers} from "../generated/schema"
export function handleNewUser(event: NewUser): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = NameOfUsers.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new NameOfUsers(event.transaction.from.toHex())
  }

  // BigInt and BigDecimal math are supported
  entity.adres_of_user = event.params.adres_of_user
  // Entity fields can be set based on event parameters
  entity.id = event.params.id.toString()
  entity.displayName = event.params.displayName
  entity.surName = event.params.surName
  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.Users(...)
}
