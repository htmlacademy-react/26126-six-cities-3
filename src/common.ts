export const getStarsStyle = (rating:number):string=>`${(Math.round(rating) * 20).toString() }%`;
