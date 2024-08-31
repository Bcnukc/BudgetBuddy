declare module "pushmodal" {
  export function createPushModal(options: any): {
    pushModal: (modalName: string, props?: any) => void;
    popModal: (modalName?: string) => void;
    popAllModals: () => void;
    replaceWithModal: (modalName: string, props?: any) => void;
    useOnPushModal: (
      modalName: string,
      callback: (open: boolean, props: any) => void
    ) => void;
    onPushModal: (
      modalName: string,
      callback: (open: boolean, props: any) => void
    ) => () => void;
    ModalProvider: React.FC;
  };
}
