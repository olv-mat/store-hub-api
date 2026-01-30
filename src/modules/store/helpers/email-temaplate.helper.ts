import { RequestStoreDto } from '../dtos/RequestStore.dto';

export class MailTemplateHelper {
  public static buildStoreRequestHtml(dto: RequestStoreDto): string {
    return `
      <div>
        <h1>New Store Request Received</h1>
        <p><strong>Store:</strong> ${dto.store}</p>
        <p><strong>Category:</strong> ${dto.category}</p>
        <p><strong>Owner:</strong> ${dto.owner}</p>
        <p><strong>Email:</strong> ${dto.email}</p>
        <p><strong>WhatsApp:</strong> ${dto.whatsapp}</p>
        <hr/>
        <h3>Address Details</h3>
        <p>
          ${dto.street}, ${dto.number}<br>
          ${dto.neighborhood} - ${dto.city}/${dto.state}
        </p>
        <hr/>
        <h3>Description</h3>
        <p>${dto.description}</p>
      </div>
    `;
  }
}
