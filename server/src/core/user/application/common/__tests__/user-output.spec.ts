import { User } from "src/core/user/domain/user.entity";
import { UserOutputMapper } from "../user-output";


describe('UserOutputMapper Unit Tests', () => {
  test('should convert a user in output', () => {

    const entity = User.create({
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = UserOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.user_id?.id,
      username: 'Guilherme Candidato',
      password: 'GuilhermeCandidato',
      birthdate: '19/05/2000',
      balance: "0",
      created_at: entity.created_at,
    });
  });
});
