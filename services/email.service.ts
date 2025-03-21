import { config } from "../config/env.ts";

interface EmailResponse {
  email_addr: string;
  sid_token: string;
}

interface EmailListResponse {
  list: Array<{
    mail_id: string;
    mail_subject: string;
    mail_from: string;
  }>;
}

interface EmailContentResponse {
  mail_body: string;
}

export const EmailService = {
  async generateEmail(): Promise<{ email: string; token: string }> {
    const response = await fetch(
      `${config.guerrillaMailAPI}?f=get_email_address&lang=en`
    );
    const data: EmailResponse = await response.json();
    return { email: data.email_addr, token: data.sid_token };
  },

  async getEmails(token: string): Promise<EmailListResponse> {
    const response = await fetch(
      `${config.guerrillaMailAPI}?f=get_email_list&offset=0&sid_token=${token}`
    );
    return await response.json();
  },

  async fetchEmailContent(token: string, mailId: string): Promise<EmailContentResponse> {
    const response = await fetch(
      `${config.guerrillaMailAPI}?f=fetch_email&email_id=${mailId}&sid_token=${token}`
    );
    return await response.json();
  },
};