'use strict';

/**
 * home-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home-page.home-page', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;

        const post = await strapi.db.query('api::home-page.home-page').findOne({ 
            where: { slug: id },
            populate: ['deep']
         }); 
        
         const sanitizedPost = await this.sanitizeOutput(post, ctx);
         return this.transformResponse(sanitizedPost);
    }
}));
