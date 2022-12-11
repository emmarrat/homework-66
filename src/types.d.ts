export interface MealTypeApi {
  time: string;
  descr: string;
  calories: number;
}

export interface MealsListApi {
  [id: string]: MealTypeApi;
}

export interface MealType extends MealTypeApi {
  id: string;
}

export interface MealOnClientSide {
  time: string;
  descr: string;
  calories: string;
}