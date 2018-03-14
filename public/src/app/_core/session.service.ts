import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SessionService {

  constructor(private router: Router) { }

  /* Client */

  /**
   * Store client info in local storage
   */
  storeClient(client) {
    localStorage.setItem('client', JSON.stringify(client));
  }

  /**
   * Check if client is logged in
   */
  isClientLoggedIn() {
    const data = localStorage.getItem('client');
    if (!data) { return null; }
    const session = JSON.parse(data);
    return session && session.token;
  }

  /**
   * Destroy client object in local storage
   */
  destroyClient() {
    localStorage.removeItem('client');
  }

  /**
   * Get logged client
   */
  getClient() {
    const data = localStorage.getItem('client');
    if (!data) { return null; }
    const client = JSON.parse(data);
    return client.client;
  }

  /**
   * Get client session token
   */
  getClientToken() {
    const data = localStorage.getItem('client');
    if (!data) { return null; }
    const client = JSON.parse(data);
    return client.token;
  }

  /**
   * Get logged client email
   */
  getClientEmail() {
    const data = localStorage.getItem('client');
    if (!data) { return null; }
    const client = JSON.parse(data);
    return client.client.email;
  }

  /**
   * Get logged client id
   */
  getClientId() {
    const data = localStorage.getItem('client');
    if (!data) { return null; }
    const client = JSON.parse(data);
    return client.client._id;
  }


  /* Manager */

  /**
   * Store manager info in local storage
   */
  storeManager(manager) {
    localStorage.setItem('manager', JSON.stringify(manager));
  }

  /**
   * Check if manager is logged in
   */
  isManagerLoggedIn() {
    const data = localStorage.getItem('manager');
    if (!data) { return null; }
    const session = JSON.parse(data);
    return session && session.token;
  }

  /**
   * Destroy manager object in local storage
   */
  destroyManager() {
    localStorage.removeItem('manager');
  }

  /**
   * Get logged manager
   */
  getManager() {
    const data = localStorage.getItem('manager');
    if (!data) { return null; }
    const manager = JSON.parse(data);
    return manager.manager;
  }

  /**
   * Get manager session token
   */
  getManagerToken() {
    const data = localStorage.getItem('manager');
    if (!data) { return null; }
    const manager = JSON.parse(data);
    return manager.token;
  }

  /**
   * Get logged manager email
   */
  getManagerEmail() {
    const data = localStorage.getItem('manager');
    if (!data) { return null; }
    const manager = JSON.parse(data);
    return manager.manager.email;
  }

  /**
   * Get logged manager id
   */
  getManagerId() {
    const data = localStorage.getItem('manager');
    if (!data) { return null; }
    const manager = JSON.parse(data);
    return manager.manager._id;
  }

  /**
   * Logout client or manager
   */
  logout(client: boolean) {
    if (client) {
      this.destroyClient();
    } else {
      this.destroyManager();
    }

    this.router.navigate(['']);
  }

}
