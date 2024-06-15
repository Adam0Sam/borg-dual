'use strict';

/**
 * task controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::task.task', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;

        const post = await strapi.db.query('api::task.task').findOne({ 
            where: { slug: id },
            populate: ['deep']
         }); 
        
         const sanitizedPost = await this.sanitizeOutput(post, ctx);
         return this.transformResponse(sanitizedPost);
    }
}));

