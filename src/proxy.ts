import { BroadcastAPIOptions, IBroadcastAPI, MessageData, WebBroadcast } from './broadcast'
import WebPostMsg from '@kazura/web-postmsg'
import PostMsgBuilder from '@kazura/postmsg-builder'

export interface BroadcastProxyData<T = any> extends MessageData<T> {
  proxy?: any
}

export type Listener = (resources: any, event: MessageEvent<BroadcastProxyData>) => void

export interface IBroadcastProxyAPI extends IBroadcastAPI {
  on(type: string, listener: Listener): void
  off(type: string, listener?: Listener): void
}

export interface BroadcastProxyAPIOptions extends BroadcastAPIOptions {
  proxy: string
}

export class WebBroadcastProxy extends WebBroadcast implements IBroadcastProxyAPI {
  public postmsg: WebPostMsg

  public constructor(options: BroadcastProxyAPIOptions) {
    super(options)
    const builder = new PostMsgBuilder().createChildIFrameReceiver(this.createIFrame())
    this.postmsg = builder.build()

    builder.loadURL(options.proxy)
  }

  public createIFrame() {
    const iframe = document.createElement('iframe')
    iframe.name = WebPostMsg.generateUUID()
    iframe.className = 'broadcast-proxy-iframe'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    return iframe
  }

  public override postPublicMessage(type: string, resources: any) {
    const message = this.generateMessage(type, resources)
    this.publicBroadcast.postMessage(message)

    this.postmsg.emit('broadcast-proxy__postPublicMessage', message)
  }

  public override postPrivateMessage(type: string, resources: any, to: string) {
    let broadcast = this.broadcastPool.get(to)
    if (!broadcast) broadcast = new BroadcastChannel(to)

    const message = this.generateMessage(type, resources, to)
    broadcast.postMessage(message)

    this.postmsg.emit('broadcast-proxy__postPrivateMessage', message)
  }

  public override generateMessage(type: string, resources: any, to?: string): BroadcastProxyData {
    return {
      ...super.generateMessage(type, resources, to),
      proxy: {},
    }
  }

  public override on(type: string, listener: Listener) {
    super.on(type, listener)
  }

  public override off(type: string, listener?: Listener) {
    super.off(type, listener)
  }
}
