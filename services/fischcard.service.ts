import { db } from "../utils/db";
import { Card } from "../models/fischcardModel";
import { HydratedDocument, QueryOptions } from "mongoose";
import {
  CardPayload,
  CreateCardPayload,
  UpdateCardPayload,
} from "../utils/types";

export const getAllCardsByQuery = async (query: QueryOptions) => {
  try {
    //connect to db
    db;
    //take cards
    const allCardsByQuery = Card.find(query).sort({
      date: "asc",
    });

    return allCardsByQuery;
  } catch (error) {
    return error;
  }
};

type query = { [key: string]: { $regex: string; $options: string } };
export const prepareQueryForDb = (key: string, value: string) => {
  return { [key]: { $regex: value, $options: "i" } } as query;
};

export const cardValidationByFrontValue = async (
  cardFront: string,
  cardId: string
) => {
  //set db connection
  db;
  //check, is card with the front arleady exist in db?
  const existingCard = await Card.findOne({ front: cardFront });

  return existingCard;
};

export const updateCard = async (
  dataToUpdateCard: UpdateCardPayload,
  cardId: string
) => {
  db;
  //update card
  const updatedCard: Promise<HydratedDocument<CreateCardPayload>> =
    Card.findOneAndUpdate({ _id: cardId }, dataToUpdateCard, {
      new: true,
    });

  return updatedCard;
};
