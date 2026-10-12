/**
* @param {Internal.CommandContext<Internal.CommandSourceStack>} ctx
* @param {Internal.Vector3d} position
* @param {String} mode
* @param {String} sound
* @param {String} is_quiet
*/
function create_backrooms_speaker_command(ctx,position,mode,sound){
	const [pos_x, pos_y, pos_z] = [position.x(), position.y(), position.z()]
	const level = ctx.source.getLevel()
	let speaker = level.getBlock(pos_x,pos_y,pos_z)
	let speaker_data = speaker.getEntityData().getCompound("data")
	speaker.set("kubejs:backrooms_speaker")
	speaker_data.putString("mode",mode)
	speaker_data.putString("sound",sound)
	speaker_data.putInt("duration",get_specific_sound_duration(sound))
    return 1
}
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments} = event

	let specific_execute = (ctx,literal,sound) => {
		/** @type {Internal.Vector3d} */
        const position = Arguments.VEC3.getResult(ctx, "speaker_pos")
		if (literal == "repeat") {create_backrooms_speaker_command(ctx,position,"repeat",sound,false)}
		if (literal == "random") {create_backrooms_speaker_command(ctx,position,"random",sound,false)}
		if (literal == "cooldown") {create_backrooms_speaker_command(ctx,position,"cooldown",sound,false)}
		return 1
    }
	event.register(
        Commands.literal("backrooms").requires(source => source.hasPermission(2))
		.then(Commands.literal("create").requires(source => source.hasPermission(2))
			.then(Commands.literal("speaker").requires(source => source.hasPermission(2))
				.then(Commands.argument('speaker_pos', Arguments.BLOCK_POS.create(event)).requires(source => source.hasPermission(2))
					.then(Commands.literal("repeat").requires(source => source.hasPermission(2))
						.then(Commands.argument('sound', Arguments.STRING.create(event)).requires(source => source.hasPermission(2))).executes(ctx => specific_execute(ctx,"repeat","sound")))
					.then(Commands.literal("random").requires(source => source.hasPermission(2)).executes(ctx => specific_execute(ctx,"random","")))
					.then(Commands.literal("cooldown").requires(source => source.hasPermission(2)).executes(ctx => specific_execute(ctx,"cooldown","")))
				)
			)
		)
	)
})
/**
* @param {String} sound
*/
function get_specific_sound_duration(sound){
	//eventually this should be a config
	if (sound == "") {
		return 10
	}
	return 0
}