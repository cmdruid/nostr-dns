import useStore from '@/hooks/useStore';
import { ReactElement } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
  props ?: any
}

declare global {
  interface Window {
    nostr: {
      getPublicKey : () => Promise<string>
      signEvent    : (event : any) => Promise<any>
      getRelays    : () => Promise<string[]>
      nip04        : {
        encrypt: (peer : string, plaintext  : string) => Promise<string>
        decrypt: (peer : string, ciphertext : string) => Promise<string>
      }
    }
  }
}

export default function Auth (
  { props } : Props
) : ReactElement {

  const { store, update } = useStore();

  const submit = async () => {
    if (window.nostr.getPublicKey !== undefined) {
      const pubkey = await window.nostr.getPublicKey();
      update({ pubkey });
      toast.success('Authentication successful!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 'auth-toast',
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.container}>
      { store.pubkey &&
        <div className={styles.headerRight}>
          <p>Authenticated as: &nbsp;</p>
          <pre>{ store.pubkey }</pre>
        </div>
      }
      <div className={styles.headerRight}>
        <button className={styles.loginButton} onClick={submit}>
        <FaUserCircle />
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
