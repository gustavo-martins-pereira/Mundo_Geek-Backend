import { Category } from '../models/categoryModel.js';
import { CategoryAlreadyExistsError, CategoryNotFoundError } from "../utils/errors/categoryError.js";

async function createCategoryUsecase(categoryBody) {
    const category = {
        name: categoryBody.name.toLowerCase(),
    };

    const existingCategory = await Category.findOne({ name: category.name });
    if(existingCategory) throw new CategoryAlreadyExistsError(400, "Já existe uma categoria com esse nome");

    const newCategory = new Category(category);
    const savedCategory = await newCategory.save();

    return savedCategory;
}

async function getCategoriesUsecase() {
    const categories = await Category.find().populate("products");

    return categories;
}

async function getCategoryByNameUsecase(name) {
    const category = await Category.findOne({ name: name.toLowerCase() }).populate("products");

    return category;
}

export {
    createCategoryUsecase,
    getCategoriesUsecase,
    getCategoryByNameUsecase,
};