'use strict';

/**
 * navigation-collection controller
 */


// magic blackbox: DO NOT TOUCH
const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::navigation-collection.navigation-collection');


// const modelUid = "api::navigation-collection.navigation-collection";

// module.exports = createCoreController(modelUid, ({ strapi }) => ({

//     async find(ctx) {
//         const { query } = ctx;
//         console.log("query: ", query);
//         const { results, meta } = await strapi.service(modelUid).find({
//             ...query,
//         });

//         console.log("results: ", results[0].NavLink);
//         const sanitizedEntities = await this.sanitizeOutput(results, ctx);

//         return {
//             data: sanitizedEntities,
//             meta,
//         };
//     },


// }));