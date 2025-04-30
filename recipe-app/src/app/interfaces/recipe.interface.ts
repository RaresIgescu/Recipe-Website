export interface Recipe {
	id: string;
	name: string;
	image: string;
	tags?: string[];
	prepTimeMinutes: number;
	difficulty?: string;
}

const a: Pick<Recipe, 'name'> = {name: 'aaa'}


//vom avea toate atributele mai putin cel omis
//putem sa l adaugam dar nu este obligatoriu
//const a: Omit<Recipe, 'name'> = {id: '1'}