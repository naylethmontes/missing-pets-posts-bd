enum PetsPostStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class CreatePetDto {
  constructor(
    public pet_name: string,
    public description: string,
    public owner: string
  ) {}

  static execute(object: { [key: string]: any }): [string?, CreatePetDto?] {
    const { pet_name, description, owner } = object;

    if (!pet_name) return ['pet name is required'];
    if (!description) return ['description is required'];

    if (!owner) return ['owner is required'];

    return [
      undefined,
      new CreatePetDto(
        pet_name.trim().toLowerCase(),
        description.trim(),
        owner.trim().toLowerCase()
      ),
    ];
  }
}
