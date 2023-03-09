export type PluginProp<GetType> = {
  name: string;
  parent: Plugin;
  // return this.parent.get(this.name, filter);
  get: (filter?: any) => Promise<GetType>;
  // return this.parent.set(this.name, data);
  set: (data) => void;
  // this.parent.onChange(this.name, filter, cb);
  onChange: (filter_or_cb: object|((message: Record<string, any>) => void), cb?: (message: Record<string, any>) => void) => void;
  // this.parent.onAdd(this.name, filter, cb);
  onAdd: (filter_or_cb: object|((message: Record<string, any>) => void), cb?: (message: Record<string, any>) => void) => void;
  // this.parent.onDelete(this.name, filter, cb);
  onDelete: (filter_or_cb: object|((message: Record<string, any>) => void), cb?: (message: Record<string, any>) => void) => void;
  // this.parent.onUpdate(this.name, filter, cb);
  onUpdate: (filter_or_cb: object|((message: Record<string, any>) => void), cb?: (message: Record<string, any>) => void) => void;
};

export type Plugin = {
  params: PluginProp<Record<string, any>>;
  devices: PluginProp<Record<string, any>[]>;
  types: PluginProp<Record<string, any>[]>;
  channels: PluginProp<Record<string, any>[]>;
  extra: PluginProp<Record<string, any>[]>; // ???
  users: PluginProp<Record<string, any>[]>; // ???
  places: PluginProp<Record<string, any>>;  // ???
  rooms: PluginProp<Record<string, any>>;   // ???
  persistent: PluginProp<Record<string, any>>; // ???
  
  agent: any;
  logger: any;
  opt: any;
  apimanager: any;

  log: (msg: string, level?: number) => void;
  exit: (code?: number, msg?: string) => void;
  sleep: (ms: number) => Promise<never>;

  // return this.agent.sendRequest('get', { name, filter });
  get: (name: string, filter?: any) => Promise<any>;
  // return this.agent.sendRequest('set', { name, data });
  set: (name: string, data) => Promise<unknown>;

  /*if (typeof dn == 'string') {
    this.agent.send({ type: 'command', command: { dn, act, prop, value } });
  } else if (typeof dn == 'object') {
    if (act) {
      this.agent.send({ type: 'command', command: { filter: dn, act, prop, value } });
    } else {
      // dn = {did, act, prop, value}
      this.agent.send({ type: 'command', command: { ...dn } });
    }
  }*/
  do: (dn, act, prop, value) => void;
  
  // this.agent.send({ type: 'startscene', id, arg, sender });
  startscene: (id, arg, sender) => void;
  
  sendProcessInfo: () => void;
  
  send: (sendObj: object) => void;
  // send с type = 'data'
  sendData: (data: any) => void;
  // send с type = 'state'
  sendWorkingState: (data: any) => void;
  // send с type = 'archive'
  sendArchive: (data: any) => void;
  // send с type = 'command'
  sendCommand: (command: object) => void;
  // send с type = 'histdata'
  sendHistdata: (data: any) => void;
  // this.agent.sendResponse(message, response)
  sendResponse: (message, response) => void;

  // this.agent.handlers.onAct = cb;
  onAct: (cb: (message: Record<string, any>) => void) => void;
  // this.agent.handlers.onCommand = cb;
  onCommand: (cb: (command: Record<string, any>) => void) => void;
  // this.agent.handlers.onScan = cb;
  onScan: (cb: (message: Record<string, any>) => void) => void;
  // this.agent.subscribe(event, filter, cb);
  onSub: (event: string, filter_or_cb: object|((message: Record<string, any>[]) => void), cb?: (message: Record<string, any>[]) => void) => void;
  // this.agent.subscribe('tableupdated', { tablename: name, filter }, cb);
  onChange: (name: string, filter_or_cb: object|((message: Record<string, any>) => void), cb?: (message: Record<string, any>) => void) => void;
  // this.agent.subscribe('tableupdated', { tablename: name, op: 'add', filter }, cb);
  onAdd: (name: string, filter_or_cb: object|((message: Record<string, any>) => void), cb?: (message: Record<string, any>) => void) => void;
  // this.agent.subscribe('tableupdated', { tablename: name, op: 'delete', filter }, cb);
  onDelete: (name: string, filter_or_cb: object|((message: Record<string, any>) => void), cb?: (message: Record<string, any>) => void) => void;
  // this.agent.subscribe('tableupdated', { tablename: name, op: 'update', filter }, cb);
  onUpdate: (name: string, filter_or_cb: object|((message: Record<string, any>) => void), cb?: (message: Record<string, any>) => void) => void;
}
