import { regularExp } from '../../../config';

export class CreatePetDto {
  constructor(
    public pet_name: string,
    public description: string,
    public owner: string,
    public image_url: string
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreatePetDto?] {
    const { pet_name, description, owner, image_url } = object;

    if (!pet_name) return ['pet name is required'];
    if (!description) return ['description is required'];
    if (!regularExp.description.test(description))
      return ['description is invalid'];

    if (!owner) return ['owner is required'];
    if (!image_url) return ['image url is required'];
    if (!regularExp.image_url.test(image_url)) return ['image url is invalid'];

    return [
      undefined,
      new CreatePetDto(
        pet_name.trim().toLowerCase(),
        description.trim(),
        owner.trim().toLowerCase(),
        image_url.trim().toLowerCase()
      ),
    ];
  }
}
