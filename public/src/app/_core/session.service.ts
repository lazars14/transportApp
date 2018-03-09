import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  constructor() { }

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
   * Client logout
   */
  clientLogout() {
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
   * Manager logout
   */
  managerLogout() {
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

}