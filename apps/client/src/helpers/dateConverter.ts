const dateOptions: any = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const getCurrentDate = (createdDate?: any) => {
  const newDate = new Date(createdDate ?? null);
  return newDate.toLocaleDateString('en-us', dateOptions);
};
