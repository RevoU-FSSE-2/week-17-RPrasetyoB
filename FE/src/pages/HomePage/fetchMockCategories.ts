export const mockCategories = [
    {
      id: '1',
      name: 'Category 1',
      is_active: 'true',
    },
    {
      id: '2',
      name: 'Category 2',
      is_active: 'false',
    },
  ];
  
  export const fetchMockCategories = async () => {
    return {
      json: async () => ({ data: mockCategories }),
      ok: true,
    };
  };
  