import axios from 'axios'
import Router from 'koa-router'
import withResponse from '../../middlewares/wrappers/with-response'
import { NodeRegistry } from '../../domains/nodes-registration/node-registration'
import { RegisterNodeRequest, registerNodeRequest } from './middlewares/request'

export const registerNodeSubRouter = (): Router.IMiddleware => {
  const router = new Router({
    prefix: '/register'
  })

  router.post(
    '/register-node-and-broadcast',
    registerNodeRequest,
    withResponse<
      {
        status: string
      },
      RegisterNodeRequest
    >(
      async ({
        state: {
          validatedRequest: { nodeHostname }
        }
      }) => {
        NodeRegistry.registerNewNode(nodeHostname)

        for (const node of NodeRegistry.otherNodesHostnames) {
          console.log((await axios.post(`http://${node}:3000/api/v1/register/register-node`, { nodeHostname })).data)
        }

        // .forEach(node => {
        //   console.log(node)
        // })

        return {
          body: {
            status: 'SUCCESS'
          }
        }
      }
    )
  )

  router.post(
    '/register-node',
    registerNodeRequest,
    withResponse<
      {
        status: string
      },
      RegisterNodeRequest
    >(
      ({
        state: {
          validatedRequest: { nodeHostname }
        }
      }) => {
        NodeRegistry.registerNewNode(nodeHostname)
        console.log('Current registered nodes are:', NodeRegistry.otherNodesHostnames)
        return {
          body: {
            status: 'SUCCESS'
          }
        }
      }
    )
  )

  router.post(
    '/register-nodes-bulk',
    registerNodeRequest,
    withResponse<
      {
        status: string
      },
      RegisterNodeRequest
    >(({ state: { validatedRequest } }) => {
      return {
        body: {
          status: 'SUCCESS'
        }
      }
    })
  )

  return router.routes()
}
