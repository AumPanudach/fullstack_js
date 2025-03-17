const { Product, Category } = require('../models');

const productController = {
  getAll: async (req, res, next) => {
    try {
      const products = await Product.findAll({ include: Category });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id, { include: Category });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, price, inStock, categoryId } = req.body;
      const newProduct = await Product.create({ name, price, inStock, categoryId });
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { name, price, inStock, categoryId } = req.body;
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await product.update({ name, price, inStock, categoryId });
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await product.destroy();
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = productController;