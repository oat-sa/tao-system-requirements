<ul class="<?=key($data)?>" data-tao-type="system-requirement">
    <?php foreach($data['languages'] as $part): ?>
        <li>
            <span class="title"><?=$part['label']?></span>
            <span class="versions"><?=$part['versionStr']?></span>
        </li>
    <?php endforeach; ?>
</ul>