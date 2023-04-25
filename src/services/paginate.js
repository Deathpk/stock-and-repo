export const paginate = (pageNumber, pageSize, items) => {
    const startIndex = (pageNumber -1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
}