
export function OrderListUtils(
    list: any[],
    searchQuery: string,
    selectedSearchOption: string,
    selectedSortOption: string
  ): any[] {
    const filteredList = Array.isArray(list)
      ? list.filter((item: any) => {
          const query = searchQuery.toLowerCase();
          let itemFilter = item[selectedSearchOption];
          return (
            searchQuery === "" ||
            (typeof itemFilter === 'string' && itemFilter.toLowerCase().includes(query)) ||
            (typeof itemFilter === 'number' && itemFilter === parseInt(query))
          );
        })
      : [];
  
    const sortingFunctions: { [key: string]: (a: any, b: any) => number } = {
      "a-z": (a: any, b: any) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
      "z-a": (a: any, b: any) => b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }),
      "most recent": (a: any, b: any) => filteredList.indexOf(b) - filteredList.indexOf(a),
      "least recent": (a: any, b: any) => filteredList.indexOf(a) - filteredList.indexOf(b),
    };
  
    const orderedList = [...filteredList].sort(sortingFunctions[selectedSortOption]);
  
    return orderedList;
  }
  