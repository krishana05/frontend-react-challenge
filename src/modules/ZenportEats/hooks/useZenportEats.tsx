import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import { FoodMenuItem, FoodTypes, foods as availableFoods, FoodMenu } from '../data/food-menu';
import { Order } from '../types';

interface ZenportEatsContextProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  foods: FoodMenu;
  setFoods: Dispatch<SetStateAction<FoodMenu>>;
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
  selectedIdx: number;
  setSelectedIdx: Dispatch<SetStateAction<number>>;
  handleFoodItemAdd: (foodItem: FoodMenuItem) => void;
  handlePersonDelete: (personIdx: number) => void;
  handlePersonAdd: () => void;
  handleFoodTypeChange: (tyep: FoodTypes) => void;
}

/* eslint-disable */
const defaultOrder = {
  numPeople: 0,
  orders: [],
};

const ZenportEatsContext = createContext<ZenportEatsContextProps>({
  page: 1,
  setPage: () => {},
  foods: availableFoods,
  setFoods: () => {},
  order: defaultOrder,
  setOrder: () => {},
  selectedIdx: 0,
  setSelectedIdx: () => {},
  handleFoodItemAdd: () => {},
  handlePersonDelete: () => {},
  handlePersonAdd: () => {},
  handleFoodTypeChange: () => {},
});

interface Props {
  children?: React.ReactNode;
}

export const ZenportEatsProvider = ({ children }: Props) => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [foods, setFoods] = useState<FoodMenu>(availableFoods);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleFoodItemAdd = (foodItem: FoodMenuItem) => {
    const newOrders = [...order.orders];

    const itemToUpdate = newOrders[selectedIdx].items.find((item) => item.id === foodItem.id);

    if (itemToUpdate) {
      itemToUpdate.itemCount++;
    } else {
      newOrders[selectedIdx].items.push({
        ...foodItem,
        itemCount: 1,
      });
    }

    setOrder({
      ...order,
      orders: newOrders,
    });
  };

  const handlePersonDelete = (personIdx: number) => {
    const newOrder = {
      ...order,
      orders: order.orders.filter((_, orderIdx) => orderIdx !== personIdx),
    };

    setOrder(newOrder);
  };

  const handlePersonAdd = () => {
    //trying to read last person's index and then will increment in last person's index
    const lastPersonIndex = Number(order.orders[order.orders.length - 1].name.split(' ')[1]);
    const newOrder = {
      ...order,
      orders: [
        ...order.orders,
        {
          name: `Person ${lastPersonIndex + 1}`,
          items: [],
        },
      ],
    };

    setOrder(newOrder);
  };
  const handleFoodTypeChange = useCallback((type) => {
    if (type) {
      let newFoods: any = {};
      newFoods[type as FoodTypes] = foods[type as FoodTypes];
      setFoods(newFoods);
    } else setFoods(foods);
  }, []);

  return (
    <ZenportEatsContext.Provider
      value={{
        page,
        setPage,
        foods,
        setFoods,
        order,
        setOrder,
        selectedIdx,
        setSelectedIdx,
        handleFoodItemAdd,
        handlePersonDelete,
        handlePersonAdd,
        handleFoodTypeChange,
      }}
    >
      {children}
    </ZenportEatsContext.Provider>
  );
};

export const useZenportEats = () => useContext(ZenportEatsContext);
