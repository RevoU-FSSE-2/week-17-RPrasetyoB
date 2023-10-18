import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

interface Categories {
    _id: string;
    task: string;
    status: string;
    maker:string;
}


interface ContextProps {
    categories: Categories[];
    setCategories: Dispatch<SetStateAction<Categories[]>>;
}

interface Props {
    children: ReactNode;
}

const defaultValue: ContextProps = {
    categories: [],
    setCategories: () => { }
};

export const AppContext = createContext<ContextProps>(defaultValue);

const AppProvider = ({ children }: Props) => {
    const [categories, setCategories] = useState<Categories[]>([]);

    return (
        <AppContext.Provider value={{ categories, setCategories }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;