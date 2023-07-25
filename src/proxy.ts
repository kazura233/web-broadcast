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

  public postPublicMessage(type: string, resources: any): BroadcastProxyData {
    const message = super.postPublicMessage(type, resources)
    this.postmsg.emit('broadcast-proxy__postPublicMessage', message)
    return message
  }

  public postPrivateMessage(type: string, resources: any, to: string): BroadcastProxyData {
    const message = super.postPrivateMessage(type, resources, to)
    this.postmsg.emit('broadcast-proxy__postPrivateMessage', message)
    return message
  }

  public override generateMessage(type: string, resources: any, to?: string): BroadcastProxyData {
    return {
      ...super.generateMessage(type, resources, to),
      proxy: { referer: window.location.href },
    }
  }

  public on(type: string, listener: Listener) {
    super.on(type, listener)
  }

  public off(type: string, listener?: Listener) {
    super.off(type, listener)
  }
}
