'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::page.page', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;

        const post = await strapi.db.query('api::page.page').findOne({ 
            where: { slug: id },
            populate: ['*']
         }); 
        
         const sanitizedPost = await this.sanitizeOutput(post, ctx);
         return this.transformResponse(sanitizedPost);
    }

}));
