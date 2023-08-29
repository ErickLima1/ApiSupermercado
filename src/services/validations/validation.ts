import { z } from "zod";

export const validationCategorySchema = z.object({
    name: z.string().nonempty('Campo nome em branco!'),
    description: z.string().nonempty('Campo Descrição em branco!'),

});


export const ValidationProdutoSchema = z.object({ 
    name: z.string().nonempty('Campo Nome Em Branco!'),
    quantidade: z.number().min(1, 'Quantidade Não Pode fica em Branco.'),
});


