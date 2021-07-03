/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-07-03 11:09 (GMT+0900)
 */
import {FoodSpecificationItem} from '@/types'

export interface StoreCounterState {
  list: StoreCounterListItem[];
}

export interface StoreCounterListItem {
  id: number;
  count?: number;
  specifications?: FoodSpecificationItem[];
}
