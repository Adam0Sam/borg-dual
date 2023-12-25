'use strict';

/**
 * navigation-collection controller
 */


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::navigation-collection.navigation-collection', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;
        const queryDepth = '3';
        const post = await strapi.db.query('api::navigation-collection.navigation-collection').findOne({ 
            where: { slug: id },
            populate: ['deep', {queryDepth}]
         }); 
        
         const sanitizedPost = await this.sanitizeOutput(post, ctx);
         return this.transformResponse(sanitizedPost);
    }
}));