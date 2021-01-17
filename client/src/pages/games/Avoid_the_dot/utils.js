import { SIZES, SPRITES } from './constants';

export const createBall = () => {
    //wybor wielkosci
    const sprite = SPRITES[Math.floor(Math.random() * SPRITES.length)]
    const size = SIZES[Math.floor(Math.random() * SIZES.length)]
    
    let x = Math.floor(Math.random() * 100);

    return {
        sprite,
        size,
        x,
        y: 0,
      }
};

export const removeBall = (dots, index) => {
    const newBalls = [...dots];
    newBalls.splice(index, 1);
    return newBalls;    
};
