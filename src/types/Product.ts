export type Product = {
    id:                  string;
    created_at:          Date;
    updated_at:          Date;
    brand:               string;
    category:            string;
    description:         string;
    image:               string;
    is_active:           boolean;
    name:                string;
    presentation:        number;
    presentation_format: string;
    price:               string;
    stock:               number;
}