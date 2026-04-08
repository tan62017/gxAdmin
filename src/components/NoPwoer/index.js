/**
 * @ description: 无查看权限
 * @ author: lonely
 * @ created_at: 2022-09-01 16:54:36
 * @ modified_record:
 * @ modified_by: lonely
 * @ modified_time: 2022-09-01 17:29:08
 */

import {
 defineComponent,
 h
} from "vue"

export default defineComponent( {
    props: {
        text: {
            type: String,
            default: "404"
        },
        customStyle: {
            type: Object,
            default: () => ( {} )
        }
    },
    setup( _ ) {
        return () => h( "div", {
            style: {
                textAlign: "center",
                paddingTop: "50px",
                fontWeight: 700,
                fontSize: "30px",
                color: "gray",
                ..._.customStyle
            }
        },  _.text )
    }
} )