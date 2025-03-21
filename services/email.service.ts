import { GUERRILLA_MAIL_API } from "../config/config.ts";

export const EmailService = {
  async generateEmail(): Promise<{ email: string; token: string }> {
    const response = await fetch(`${GUERRILLA_MAIL_API}?f=get_email_address&lang=en`);
    const data = await response.json();
    return { email: data.email_addr, token: data.sid_token };
  },

  async fetchEmails(token: string): Promise<any[]> {
    const response = await fetch(`${GUERRILLA_MAIL_API}?f=get_email_list&offset=0&sid_token=${token}`);
    return (await response.json()).list;
  },

  async fetchEmailContent(token: string, mailId: string): Promise<any> {
    const response = await fetch(`${GUERRILLA_MAIL_API}?f=fetch_email&email_id=${mailId}&sid_token=${token}`);
    return response.json();
  }
};